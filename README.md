# 🎨 Imagify - Full-Stack MERN AI Image Generation Studio

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v5.0-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=white)](https://imagify-frontend-nvr6.onrender.com)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

> **Imagify** is a modern, high-precision MERN application that converts natural language text prompts into high-resolution, photorealistic digital artwork powered by Generative AI models.

---

🌐 **Live Application**: [https://imagify-frontend-nvr6.onrender.com](https://imagify-frontend-nvr6.onrender.com)  
⚙️ **Backend API**: [https://imagify-new-ukym.onrender.com](https://imagify-new-ukym.onrender.com)  
💻 **GitHub Repository**: [https://github.com/AayushRaulkar/imagify--new](https://github.com/AayushRaulkar/imagify--new)

---

## ✨ Features & Highlights

- **⚡ Multi-Model AI Synthesis Engine**: Select between 5 distinct generative art styles:
  - 📷 **Photorealistic** (Ultra-detailed 8K photography)
  - 🎬 **Cinematic** (Dramatic movie lighting & shallow depth of field)
  - 🌃 **Cyberpunk** (Neon futuristic synthwave aesthetic)
  - 🎨 **Anime Art** (Studio Ghibli digital painting)
  - 🍿 **3D Pixar** (Octane 3D raytraced render)
- **📐 Aspect Ratio Controls**: Customizable dimensions for Square (`1:1`), Widescreen (`16:9`), and Portrait (`9:16`).
- **🪄 AI Magic Prompt Enhancer**: Automated NLP-based prompt expansion algorithm that enriches user prompts into 8K art directives with single-click enhancement.
- **🖼️ MongoDB Personal Creation Gallery (`/gallery`)**: Persisted artwork storage per user account with filter tags, prompt copying, prompt re-use, high-res downloading, and item deletion.
- **🔐 Secure Authentication & Credit System**: JWT bearer token security, bcrypt password hashing, 5 initial free credits upon registration, and credit tracking.
- **💳 Razorpay Payment Gateway**: Seamless credit purchasing integration with automated payment verification webhook callbacks.
- **🎨 Glassmorphic Responsive Design**: Built with React 19, TailwindCSS, and Framer Motion micro-animations. Fully optimized across mobile phones, tablets, laptops, and ultra-wide displays.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Vite, TailwindCSS, Framer Motion, Axios, React Toastify, React Router DOM |
| **Backend** | Node.js, Express 5, Cors, Dotenv, Form-Data |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **AI Models** | Flux.1 Generative Model (Pollinations AI) & ClipDrop Text-To-Image API |
| **Payment SDK** | Razorpay Node.js & Web SDK |
| **Hosting & Deployment**| Render Web Service (Backend) & Render Static Site (Frontend) |

---

## 🏗️ System Architecture & Data Flow

```text
[ Client (React 19 + Vite) ]
          │
          ▼  (HTTPS / JWT Bearer Token)
[ Express API Gateway (Node.js) ] ───► [ Auth Middleware (JWT Validation) ]
          │
          ├───────────────────────────► [ MongoDB Atlas (User & History DB) ]
          │
          ▼  (Prompt + Style + Aspect Ratio)
[ Generative AI Engine (Flux.1 / ClipDrop API) ]
          │
          ▼  (Base64 Image Buffer Stream)
[ Render Canvas & Save Artwork to User History ]
```

---

## 🔌 API Endpoints Summary

### 👤 User & Authentication Routes (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/user/register` | Register new account (+5 Free Credits) | ❌ |
| `POST` | `/api/user/login` | User login & JWT issuance | ❌ |
| `GET` | `/api/user/credits` | Fetch user credit balance & profile | ✅ |
| `POST` | `/api/user/pay-razor` | Create Razorpay payment order | ✅ |
| `POST` | `/api/user/verify-razor` | Verify Razorpay payment signature & add credits | ✅ |

### 🎨 Image Generation & History Routes (`/api/image`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/image/generate-image` | Synthesize AI image with selected style & aspect ratio | ✅ |
| `POST` | `/api/image/enhance-prompt` | NLP prompt expansion algorithm | ✅ |
| `GET` | `/api/image/user-history` | Fetch user's saved generation history | ✅ |
| `DELETE`| `/api/image/history/:id` | Delete artwork from user history | ✅ |

---

## 🚀 Getting Started (Local Setup Guide)

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account or Local MongoDB instance
- Git

### 1. Clone Repository
```bash
git clone https://github.com/AayushRaulkar/imagify--new.git
cd imagify--new
```

### 2. Install Dependencies
```bash
# Install root, server, and client dependencies
npm run install:all
```

### 3. Environment Variables Configuration
Create a `.env` file inside the `server/` directory:

```env
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
CLIPDROP_API="your_clipdrop_api_key"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
CURRENCY="INR"
```

Create a `.env` file inside the `client/` directory:
```env
VITE_BACKEND_URL="http://localhost:4000"
VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
```

### 4. Run Development Servers
```bash
# Start Backend Express Server (Port 4000)
npm run server

# Start Frontend Vite Dev Server (Port 5173) in a new terminal
npm run client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 License & Author

Developed by **Aayush Raulkar**.  
Distributed under the ISC License.

For inquiries or contributions, feel free to open an issue or pull request on [GitHub](https://github.com/AayushRaulkar/imagify--new).
