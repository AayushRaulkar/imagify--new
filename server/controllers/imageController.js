import axios from 'axios';
import userModel from '../models/userModel.js';
import historyModel from '../models/historyModel.js';
import FormData from 'form-data';

// Style prompt embellishment dictionary
const STYLE_PROMPTS = {
  'Photorealistic': 'photorealistic portrait, ultra-detailed 8k resolution, cinematic lighting, realistic skin textures, 85mm lens, masterwork',
  'Cinematic': 'cinematic film shot, dramatic lighting, shallow depth of field, 8k resolution, highly detailed',
  'Cyberpunk': 'cyberpunk style, glowing neon reflections, futuristic background, synthwave lighting, highly detailed',
  'Anime': 'anime style, Studio Ghibli inspired, vibrant colors, detailed line art, masterpiece',
  '3D Render': '3D Pixar animation style, Octane render, raytracing, smooth shading, vibrant lighting, 8k'
};

// Common entity & typo resolution map
const TYPO_MAP = [
  { regex: /\bvirta\s*kohli\b/gi, replacement: 'Virat Kohli, famous Indian cricketer' },
  { regex: /\bvrat\s*kohli\b/gi, replacement: 'Virat Kohli, famous Indian cricketer' },
  { regex: /\bvirat\s*koli\b/gi, replacement: 'Virat Kohli, famous Indian cricketer' },
  { regex: /\bvirat\s*kohli\b/gi, replacement: 'Virat Kohli, famous Indian cricketer' },
  { regex: /\brohit\s*sharma\b/gi, replacement: 'Rohit Sharma, Indian cricketer' },
  { regex: /\bms\s*dhoni\b/gi, replacement: 'MS Dhoni, Indian cricket legend' },
  { regex: /\bironman\b/gi, replacement: 'Iron Man superhero in armor' },
  { regex: /\bspiderman\b/gi, replacement: 'Spider-Man superhero' },
];

const cleanAndCorrectPrompt = (rawPrompt) => {
  let cleaned = rawPrompt.trim();
  
  // Apply typo & entity resolution
  TYPO_MAP.forEach(item => {
    cleaned = cleaned.replace(item.regex, item.replacement);
  });

  return cleaned;
};

// 1. Generate AI Image with Style Presets, Typo Correction & Dual-Engine Backup
export const generateImage = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const { prompt, style = 'Photorealistic', aspectRatio = '1:1', negativePrompt = '' } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: 'Missing Details: UserId and Prompt are required',
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No Credit Balance remaining',
        creditBalance: user.creditBalance,
      });
    }

    // Auto-correct typos & clean prompt
    const correctedPrompt = cleanAndCorrectPrompt(prompt);
    const styleModifier = STYLE_PROMPTS[style] || STYLE_PROMPTS['Photorealistic'];
    
    let fullPrompt = `${correctedPrompt}, ${styleModifier}`;
    if (negativePrompt) {
      fullPrompt += ` --avoid ${negativePrompt}`;
    }

    let resultImage = null;

    // Dual-Engine Synthesizer Strategy:
    // Try Pollinations SDXL / Flux engine first for celebrity & custom prompts (100% accurate)
    try {
      const seed = Math.floor(Math.random() * 100000);
      const encodedPrompt = encodeURIComponent(fullPrompt);
      
      let width = 1024;
      let height = 1024;
      if (aspectRatio === '16:9') { width = 1280; height = 720; }
      if (aspectRatio === '9:16') { width = 720; height = 1280; }

      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

      const response = await axios.get(pollinationsUrl, { responseType: 'arraybuffer', timeout: 15000 });
      if (response.data && response.data.length > 5000) {
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        resultImage = `data:image/png;base64,${base64Image}`;
      }
    } catch (pollinationErr) {
      console.log('Pollinations Engine Notice, trying ClipDrop...', pollinationErr.message);
    }

    // Fallback to ClipDrop API if Pollinations engine didn't respond
    if (!resultImage) {
      const formData = new FormData();
      formData.append('prompt', fullPrompt);

      const { data } = await axios.post(
        'https://clipdrop-api.co/text-to-image/v1',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API,
          },
          responseType: 'arraybuffer',
        }
      );

      const base64Image = Buffer.from(data, 'binary').toString('base64');
      resultImage = `data:image/png;base64,${base64Image}`;
    }

    // Deduct 1 credit
    user.creditBalance -= 1;
    await user.save();

    // Auto-save generated artwork to MongoDB user history
    const historyItem = await historyModel.create({
      userId: user._id,
      prompt: correctedPrompt,
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
      message: error.response ? 'API error during image synthesis' : error.message,
    });
  }
};

// 2. Intelligent AI Prompt Enhancer Engine
export const enhancePrompt = async (req, res) => {
  try {
    const { prompt, style = 'Photorealistic' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required for enhancement' });
    }

    // Correct typos first
    let cleaned = cleanAndCorrectPrompt(prompt);
    
    // Strip existing trailing style tags if user pasted them
    cleaned = cleaned.replace(/,\s*cinematic shot.*$/gi, '')
                     .replace(/,\s*photorealistic.*$/gi, '')
                     .replace(/,\s*cyberpunk.*$/gi, '')
                     .replace(/,\s*anime style.*$/gi, '');

    const styleModifier = STYLE_PROMPTS[style] || 'cinematic lighting, hyper-detailed, 8k resolution';
    const enhancedPrompt = `${cleaned}, ${styleModifier}, dramatic lighting, masterpiece 8k`;

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

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const history = await historyModel.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      history
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Delete Specific Creation from History
export const deleteHistoryItem = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    const { id } = req.params;

    if (!userId || !id) {
      return res.status(400).json({ success: false, message: 'Missing Details' });
    }

    await historyModel.findOneAndDelete({ _id: id, userId });

    return res.json({
      success: true,
      message: 'Creation deleted from gallery'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
