import axios from 'axios';
import userModel from '../models/userModel.js';
import historyModel from '../models/historyModel.js';
import FormData from 'form-data';

// Style prompt embellishment dictionary
const STYLE_PROMPTS = {
  'Photorealistic': 'photorealistic, high resolution 8k photography, realistic camera lighting, detailed',
  'Cinematic': 'cinematic film shot, dramatic lighting, depth of field, 8k resolution',
  'Cyberpunk': 'cyberpunk style, glowing neon lights, futuristic cityscape, 8k',
  'Anime': 'anime illustration, Studio Ghibli inspired, vibrant colors, detailed line art',
  '3D Render': '3D Pixar render, Octane render, raytracing, smooth shading, 8k'
};

// Common entity & typo resolution map
const TYPO_MAP = [
  { regex: /\bvirta\s*kohli\b/gi, replacement: 'Virat Kohli Indian cricketer' },
  { regex: /\bvrat\s*kohli\b/gi, replacement: 'Virat Kohli Indian cricketer' },
  { regex: /\bvirat\s*koli\b/gi, replacement: 'Virat Kohli Indian cricketer' },
  { regex: /\brohit\s*sharma\b/gi, replacement: 'Rohit Sharma Indian cricketer' },
  { regex: /\bms\s*dhoni\b/gi, replacement: 'MS Dhoni Indian cricketer' },
  { regex: /\bironman\b/gi, replacement: 'Iron Man' },
  { regex: /\bspiderman\b/gi, replacement: 'Spider-Man' },
];

// Sports & Action context enrichment map
const ACTION_ENRICHERS = [
  { regex: /\bflying\s*catch\b/gi, addition: 'making a dynamic diving athletic catch on stadium cricket grass' },
  { regex: /\bdiving\s*catch\b/gi, addition: 'making a dynamic diving athletic catch on stadium grass' },
  { regex: /\bbatting\b/gi, addition: 'hitting a powerful shot in stadium during cricket match' },
];

const cleanPromptText = (rawPrompt) => {
  let cleaned = rawPrompt.trim();
  
  // Apply typo correction
  TYPO_MAP.forEach(item => {
    cleaned = cleaned.replace(item.regex, item.replacement);
  });

  // Apply action enrichment if detected
  ACTION_ENRICHERS.forEach(item => {
    if (item.regex.test(cleaned)) {
      cleaned = cleaned.replace(item.regex, `${cleaned.match(item.regex)[0]} (${item.addition})`);
    }
  });

  return cleaned;
};

// 1. Generate AI Image with Gemini / ChatGPT DALL-E 3 / Flux Multi-Engine Strategy
export const generateImage = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const { prompt, style = 'Photorealistic', aspectRatio = '1:1' } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: 'Missing Details: UserId and Prompt are required',
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No Credit Balance remaining',
        creditBalance: user.creditBalance,
      });
    }

    // Clean and enrich prompt
    const cleanedUserPrompt = cleanPromptText(prompt);
    const styleModifier = STYLE_PROMPTS[style] || STYLE_PROMPTS['Photorealistic'];
    const finalPrompt = `${cleanedUserPrompt}, ${styleModifier}`;

    let resultImage = null;
    let engineUsed = "Flux.1 AI";

    // Tier 1: Google Gemini Imagen 3 API (If GEMINI_API_KEY or GEMINI_API is present)
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_API;
    if (!resultImage && geminiKey) {
      try {
        console.log("Synthesizing image via Google Gemini Imagen 3 API...");
        const geminiRes = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiKey}`,
          {
            instances: [{ prompt: finalPrompt }],
            parameters: {
              sampleCount: 1,
              aspectRatio: aspectRatio === '16:9' ? '16:9' : aspectRatio === '9:16' ? '9:16' : '1:1',
              outputMimeType: 'image/png'
            }
          },
          { headers: { 'Content-Type': 'application/json' }, timeout: 25000 }
        );

        if (geminiRes.data?.predictions?.[0]?.bytesBase64Encoded) {
          resultImage = `data:image/png;base64,${geminiRes.data.predictions[0].bytesBase64Encoded}`;
          engineUsed = "Google Gemini Imagen 3";
        }
      } catch (geminiErr) {
        console.log("Google Gemini API notice, falling to next engine...", geminiErr.message);
      }
    }

    // Tier 2: OpenAI ChatGPT DALL-E 3 API (If OPENAI_API_KEY is present)
    const openAiKey = process.env.OPENAI_API_KEY;
    if (!resultImage && openAiKey) {
      try {
        console.log("Synthesizing image via OpenAI DALL-E 3 API...");
        let size = "1024x1024";
        if (aspectRatio === '16:9') size = "1792x1024";
        if (aspectRatio === '9:16') size = "1024x1792";

        const openAiRes = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            model: 'dall-e-3',
            prompt: finalPrompt,
            n: 1,
            size: size,
            response_format: 'b64_json'
          },
          {
            headers: {
              'Authorization': `Bearer ${openAiKey}`,
              'Content-Type': 'application/json'
            },
            timeout: 30000
          }
        );

        if (openAiRes.data?.data?.[0]?.b64_json) {
          resultImage = `data:image/png;base64,${openAiRes.data.data[0].b64_json}`;
          engineUsed = "OpenAI DALL-E 3";
        }
      } catch (openAiErr) {
        console.log("OpenAI DALL-E 3 notice, falling to next engine...", openAiErr.message);
      }
    }

    // Tier 3: High-Precision Flux.1 Generative Model (Pollinations AI)
    if (!resultImage) {
      try {
        const seed = Math.floor(Math.random() * 1000000);
        const encodedPrompt = encodeURIComponent(finalPrompt);
        
        let width = 1024;
        let height = 1024;
        if (aspectRatio === '16:9') { width = 1280; height = 720; }
        if (aspectRatio === '9:16') { width = 720; height = 1280; }

        const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

        const response = await axios.get(pollinationsUrl, { 
          responseType: 'arraybuffer', 
          timeout: 25000 
        });

        if (response.data && response.data.length > 5000) {
          const base64Image = Buffer.from(response.data, 'binary').toString('base64');
          resultImage = `data:image/png;base64,${base64Image}`;
          engineUsed = "Flux.1 AI";
        }
      } catch (fluxErr) {
        console.log("Flux Engine timeout, trying ClipDrop...", fluxErr.message);
      }
    }

    // Tier 4: ClipDrop Text-To-Image API
    if (!resultImage && process.env.CLIPDROP_API) {
      const formData = new FormData();
      formData.append('prompt', finalPrompt);

      const { data } = await axios.post(
        'https://clipdrop-api.co/text-to-image/v1',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API,
          },
          responseType: 'arraybuffer',
          timeout: 20000
        }
      );

      const base64Image = Buffer.from(data, 'binary').toString('base64');
      resultImage = `data:image/png;base64,${base64Image}`;
      engineUsed = "ClipDrop API";
    }

    if (!resultImage) {
      return res.status(500).json({
        success: false,
        message: 'Image synthesis timed out across all AI engines. Please try again.',
      });
    }

    // Deduct 1 credit
    user.creditBalance -= 1;
    await user.save();

    // Auto-save generated image to user history in MongoDB
    const historyItem = await historyModel.create({
      userId: user._id,
      prompt: cleanedUserPrompt,
      style,
      aspectRatio,
      resultImage
    });

    return res.json({
      success: true,
      message: `Image Generated Successfully via ${engineUsed}`,
      creditBalance: user.creditBalance,
      resultImage,
      engineUsed,
      historyId: historyItem._id
    });
  } catch (error) {
    console.error('Generate Image Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.response?.data ? 'API error during image synthesis' : error.message,
    });
  }
};

// 2. AI Prompt Enhancer
export const enhancePrompt = async (req, res) => {
  try {
    const { prompt, style = 'Photorealistic' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required for enhancement' });
    }

    let cleaned = cleanPromptText(prompt);
    const styleModifier = STYLE_PROMPTS[style] || 'cinematic lighting, highly detailed, 8k';
    const enhancedPrompt = `${cleaned}, ${styleModifier}, high quality 8k`;

    return res.json({
      success: true,
      enhancedPrompt
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get User Generation History
export const getUserHistory = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'User ID is required' });

    const history = await historyModel.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, history });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Delete History Item
export const deleteHistoryItem = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const { id } = req.params;

    if (!userId || !id) return res.status(400).json({ success: false, message: 'Missing Details' });

    await historyModel.findOneAndDelete({ _id: id, userId });
    return res.json({ success: true, message: 'Creation deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
