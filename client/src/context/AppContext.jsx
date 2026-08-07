import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);
  const [userHistory, setUserHistory] = useState([]);
  const [showArchModal, setShowArchModal] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      if (!token) return;
      const { data } = await axios.get(
        backendUrl + "/api/user/credits",
        { headers: { token } }
      );

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        // Token invalid or expired - clear silently
        logout();
      }
    } catch (error) {
      console.log("Credits check error:", error.message);
      // If token is invalid or route not found, log out silently without distracting toast
      if (error.response?.status === 404 || error.response?.status === 401 || error.response?.status === 403) {
        logout();
      }
    }
  };

  const loadUserHistory = async () => {
    try {
      if (!token) return;
      const { data } = await axios.get(
        backendUrl + "/api/image/user-history",
        { headers: { token } }
      );

      if (data.success) {
        setUserHistory(data.history || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateImage = async ({ prompt, style = 'Photorealistic', aspectRatio = '1:1', negativePrompt = '' }) => {
    try {
      if (!token) {
        toast.info("Please login to synthesize AI images (5 Free Credits included) 🔐");
        setShowLogin(true);
        return null;
      }

      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt, style, aspectRatio, negativePrompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        loadUserHistory();
        toast.success("AI Image Synthesized Successfully!");
        return data.resultImage;
      } else {
        toast.error(data.message || "Something went wrong");
        loadCreditsData();

        if (data.creditBalance === 0 || data.credits === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      const resData = error.response?.data;
      const msg = resData?.message || error.message || "Something went wrong";

      toast.error(msg);

      const noCredits =
        resData?.creditBalance === 0 ||
        resData?.credits === 0 ||
        msg.toLowerCase().includes("no credits") ||
        msg.toLowerCase().includes("insufficient credit");

      if (noCredits) {
        navigate("/buy");
      }
      return null;
    }
  };

  const enhancePromptApi = async (prompt, style = 'Photorealistic') => {
    try {
      if (!token) {
        setShowLogin(true);
        return prompt;
      }

      const { data } = await axios.post(
        backendUrl + "/api/image/enhance-prompt",
        { prompt, style },
        { headers: { token } }
      );

      if (data.success) {
        toast.info("Prompt Enhanced with AI Magic! 🪄");
        return data.enhancedPrompt;
      } else {
        return prompt;
      }
    } catch (error) {
      console.log(error);
      return prompt;
    }
  };

  const deleteHistoryItem = async (historyId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/image/history/${historyId}`,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Artwork removed from gallery");
        setUserHistory(prev => prev.filter(item => item._id !== historyId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete creation");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setUserHistory([]);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
      loadUserHistory();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    userHistory,
    loadCreditsData,
    loadUserHistory,
    logout,
    generateImage,
    enhancePromptApi,
    deleteHistoryItem,
    showArchModal,
    setShowArchModal,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
