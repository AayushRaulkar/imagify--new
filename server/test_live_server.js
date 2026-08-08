import axios from 'axios';

async function testLiveServer() {
  try {
    console.log("Testing GET https://imagify-new-ukyn.onrender.com/");
    const resRoot = await axios.get("https://imagify-new-ukyn.onrender.com/");
    console.log("Root Response:", resRoot.data);
  } catch (e) {
    console.log("Root Error:", e.response ? e.response.status : e.message);
  }

  try {
    console.log("Testing POST https://imagify-new-ukyn.onrender.com/api/user/login");
    const resLogin = await axios.post("https://imagify-new-ukyn.onrender.com/api/user/login", {
      email: "test@gmail.com",
      password: "123"
    });
    console.log("Login Response:", resLogin.data);
  } catch (e) {
    console.log("Login Error:", e.response ? e.response.data : e.message);
  }
}

testLiveServer();
