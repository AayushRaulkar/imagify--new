import axios from 'axios';
import userModel from '../models/userModel.js';
import historyModel from '../models/historyModel.js';
import FormData from 'form-data';

// Clean style modifiers (concise & effective)
const STYLE_PROMPTS = {
  'Photorealistic': 'photorealistic, 8k resolution, highly detailed',
  'Cinematic': 'cinematic lighting, movie scene, 8k resolution',
  'Cyberpunk': 'cyberpunk style, glowing neon lights, 8k',
  'Anime': 'anime style, vibrant colors, detailed line art',
  '3D Render': '3D Pixar render style, smooth shading, 8k'
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

const cleanPromptText = (rawPrompt) => {
  let cleaned = rawPrompt.trim();
  
  // Apply typo correction
  TYPO_MAP.forEach(item => {
    cleaned = cleaned.replace(item.regex, item.replacement);
  });

  // Remove redundant repeated style strings if user pasted them
  cleaned = cleaned.replace(/(,\s*(photorealistic|cinematic|cyberpunk|anime|3D render))+/gi, '');

  return cleaned;
};

// 1. Generate AI Image with Precise Output Engine (Flux.1 / DALL-E Quality)
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

    // Clean user prompt
    const cleanedUserPrompt = cleanPromptText(prompt);
    const styleModifier = STYLE_PROMPTS[style] || STYLE_PROMPTS['Photorealistic'];
    
    // Construct clean prompt for AI model
    const finalPrompt = `${cleanedUserPrompt}, ${styleModifier}`;

    let resultImage = null;

    // Primary Engine: High-Precision Flux.1 Generative Model (Pollinations AI)
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
      }
    } catch (fluxErr) {
      console.log('Flux Engine Timeout, falling back to ClipDrop API...', fluxErr.message);
    }

    // Fallback Engine: ClipDrop Text-To-Image API
    if (!resultImage) {
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
      message: 'Image Generated Successfully',
      creditBalance: user.creditBalance,
      resultImage,
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

// 2. AI Prompt Enhancer (Clean & Direct)
export const enhancePrompt = async (req, res) => {
  try {
    const { prompt, style = 'Photorealistic' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required for enhancement' });
    }

    let cleaned = cleanPromptText(prompt);
    const styleModifier = STYLE_PROMPTS[style] || 'cinematic lighting, highly detailed, 8k';
    const enhancedPrompt = `${cleaned}, ${styleModifier}, masterpiece`;

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
