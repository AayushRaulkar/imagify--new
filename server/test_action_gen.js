import axios from 'axios';

async function testPrompt() {
  const userPrompt = "virat kohli flying catch";
  const enhanced = `${userPrompt}, Indian cricketer making a dynamic diving catch in cricket match stadium, realistic sports photography, crisp 8k, detailed face, photorealistic`;

  console.log("Testing Prompt:", enhanced);
  const encoded = encodeURIComponent(enhanced);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1280&height=720&nologo=true&model=flux`;

  try {
    const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 20000 });
    console.log("Pollinations response buffer size:", res.data.length);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testPrompt();
