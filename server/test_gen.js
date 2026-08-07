import axios from 'axios';

async function testGeneration() {
  const prompt = "Virat Kohli, Indian cricketer, portrait in cricket uniform, photorealistic 8k";
  console.log("Testing generation for prompt:", prompt);

  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&model=flux`;
    
    console.log("Calling Pollinations Flux URL:", pollinationsUrl);
    const response = await axios.get(pollinationsUrl, { responseType: 'arraybuffer', timeout: 20000 });
    
    console.log("Received response buffer length:", response.data.length);
    if (response.data.length > 5000) {
      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      console.log("SUCCESS! Base64 length:", base64.length);
    } else {
      console.log("Buffer too small!");
    }
  } catch (err) {
    console.error("Error calling Pollinations:", err.message);
  }
}

testGeneration();
