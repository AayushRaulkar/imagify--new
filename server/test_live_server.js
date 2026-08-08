import axios from 'axios';

async function testUkym() {
  try {
    console.log("Testing GET https://imagify-new-ukym.onrender.com/");
    const res = await axios.get("https://imagify-new-ukym.onrender.com/");
    console.log("Root Response:", res.data);

    console.log("Testing POST https://imagify-new-ukym.onrender.com/api/user/login");
    const resLogin = await axios.post("https://imagify-new-ukym.onrender.com/api/user/login", {
      email: "test@gmail.com",
      password: "123"
    });
    console.log("Login Response:", resLogin.data);
  } catch (err) {
    console.log("Error:", err.response ? err.response.data : err.message);
  }
}

testUkym();
