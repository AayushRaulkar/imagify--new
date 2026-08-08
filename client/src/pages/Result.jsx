import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  // Form Controls
  const [input, setInput] = useState(location.state?.prompt || "");
  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const { generateImage, enhancePromptApi } = useContext(AppContext);

  useEffect(() => {
    if (location.state?.prompt) {
      setInput(location.state.prompt);
    }
  }, [location.state]);

  const [engineName, setEngineName] = useState("Flux.1 AI");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    const res = await generateImage({
      prompt: input,
      style: selectedStyle,
      aspectRatio,
    });

    if (res) {
      setIsImageLoaded(true);
      if (typeof res === 'object' && res.resultImage) {
        setImage(res.resultImage);
        setEngineName(res.engineUsed || "Flux.1 AI");
      } else {
        setImage(res);
      }
    }

    setLoading(false);
  };

  const handleEnhance = async () => {
    if (!input.trim()) return;
    setEnhancing(true);
    const enhanced = await enhancePromptApi(input, selectedStyle);
    if (enhanced) {
      setInput(enhanced);
    }
    setEnhancing(false);
  };

  const styles = [
    { id: 'Photorealistic', name: '📷 Photorealistic' },
    { id: 'Cinematic', name: '🎬 Cinematic' },
    { id: 'Cyberpunk', name: '🌃 Cyberpunk' },
    { id: 'Anime', name: '🎨 Anime Art' },
    { id: '3D Render', name: '🍿 3D Pixar' },
  ];

  const aspectRatios = [
    { id: '1:1', label: '1:1 Square', class: 'aspect-square max-w-md' },
    { id: '16:9', label: '16:9 Widescreen', class: 'aspect-video max-w-xl' },
    { id: '9:16', label: '9:16 Portrait', class: 'aspect-[9/16] max-w-xs' },
  ];

  const currentAspect = aspectRatios.find(a => a.id === aspectRatio) || aspectRatios[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-[82vh] justify-center items-center py-8 px-4 max-w-5xl mx-auto"
    >
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          AI Generation Studio
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gradient">
          Generate AI Artwork
        </h1>
      </div>

      {/* Image Canvas Container */}
      <div className={`relative group p-3 bg-slate-900/90 rounded-3xl border border-white/15 shadow-2xl overflow-hidden w-full ${currentAspect.class} transition-all duration-500 min-h-[320px]`}>
        <div className="relative overflow-hidden rounded-2xl w-full h-full flex flex-col items-center justify-center bg-slate-950/90 border border-white/5">
          {isImageLoaded ? (
            <img 
              src={image} 
              alt="AI Generated Result" 
              className={`w-full h-full object-cover transition-all duration-500 ${loading ? "opacity-30 blur-sm scale-105" : "opacity-100 scale-100"}`} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center my-auto">
              <div className="p-5 rounded-full bg-purple-950/60 border border-purple-500/30 mb-4 animate-pulse">
                <span className="text-4xl">🪄</span>
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-1">AI Studio Canvas Ready</h3>
              <p className="text-xs text-slate-400 max-w-xs font-light">
                Type your prompt below and click <span className="text-purple-300 font-semibold">Generate</span> to synthesize custom AI artwork.
              </p>
            </div>
          )}

          {/* Watermark & Engine Badge */}
          {isImageLoaded && (
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-purple-300 pointer-events-none flex items-center gap-1 shadow-lg">
              <span>✨ Powered by {engineName}</span>
            </div>
          )}

          {/* Loading Animation Overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/85 backdrop-blur-md z-30">
              <div className="w-14 h-14 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
              <p className="text-purple-300 font-bold text-sm animate-pulse">Synthesizing Artwork ({selectedStyle})...</p>
              <p className="text-slate-400 text-xs mt-1 font-light">Generating accurate AI visual tokens</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Controls Form */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-3xl mt-6">
        
        {/* Style Selector Pills */}
        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {styles.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  selectedStyle === style.id
                    ? "glow-gradient text-white shadow-lg border-purple-400"
                    : "bg-slate-900/80 text-slate-300 hover:bg-purple-900/30 border border-white/10"
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex justify-center gap-2 mb-4">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.id}
              type="button"
              onClick={() => setAspectRatio(ratio.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                aspectRatio === ratio.id
                  ? "bg-purple-900/60 border-purple-400 text-white"
                  : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200"
              }`}
            >
              {ratio.label}
            </button>
          ))}
        </div>

        {/* Prompt Input Control Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 glass-panel p-2 rounded-3xl border border-white/15 shadow-2xl focus-within:border-purple-500/80 focus-within:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to create (e.g. Virat Kohli playing cricket, Cyberpunk car in Tokyo)..."
            className="w-full sm:flex-1 bg-transparent outline-none px-4 py-2 text-sm text-slate-100 placeholder-slate-400 font-light"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleEnhance}
              disabled={enhancing || !input.trim()}
              title="Magic AI Prompt Enhancer"
              className="bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>{enhancing ? "Enhancing..." : "🪄 Enhance"}</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="glow-gradient text-white font-bold px-7 py-2.5 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 text-sm flex items-center gap-2"
            >
              <span>{loading ? "Generating..." : "Generate"}</span>
              {!loading && <img src={assets.star_group} alt="stars" className="h-4 filter brightness-0 invert" />}
            </button>
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center items-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="glass-panel glass-panel-hover text-slate-200 hover:text-purple-300 border border-white/15 px-8 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer"
          >
            ← Synthesize Another
          </button>

          <div className="flex items-center gap-2">
            <a
              href={image}
              download="imagify_ai_artwork.png"
              className="glow-gradient text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-sm flex items-center gap-2"
            >
              <span>Download High-Res</span>
              <span className="text-xs">↓</span>
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Result;
