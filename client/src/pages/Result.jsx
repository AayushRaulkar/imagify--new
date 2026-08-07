 


import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  // Form Controls
  const [input, setInput] = useState(location.state?.prompt || "");
  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Post-Processing Canvas FX State
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [activePreset, setActivePreset] = useState('none');
  const [showWatermark, setShowWatermark] = useState(true);

  const { generateImage, enhancePromptApi } = useContext(AppContext);

  useEffect(() => {
    if (location.state?.prompt) {
      setInput(location.state.prompt);
    }
  }, [location.state]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    const img = await generateImage({
      prompt: input,
      style: selectedStyle,
      aspectRatio,
      negativePrompt
    });

    if (img) {
      setIsImageLoaded(true);
      setImage(img);
      // reset canvas filters
      resetFilters();
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

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setSepia(0);
    setGrayscale(0);
    setActivePreset('none');
  };

  const applyPreset = (presetName) => {
    setActivePreset(presetName);
    if (presetName === 'cyberpunk') {
      setBrightness(110);
      setContrast(130);
      setSaturate(180);
      setSepia(0);
      setGrayscale(0);
    } else if (presetName === 'vintage') {
      setBrightness(95);
      setContrast(90);
      setSaturate(80);
      setSepia(50);
      setGrayscale(0);
    } else if (presetName === 'noir') {
      setBrightness(105);
      setContrast(140);
      setSaturate(0);
      setSepia(0);
      setGrayscale(100);
    } else {
      resetFilters();
    }
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
    { id: '9:16', label: '9:16 Story/Portrait', class: 'aspect-[9/16] max-w-xs' },
  ];

  const currentAspect = aspectRatios.find(a => a.id === aspectRatio) || aspectRatios[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col min-h-[82vh] justify-center items-center py-8 px-4 max-w-5xl mx-auto"
    >
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          AI Generation Studio
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gradient">
          Synthesize & Edit Artwork
        </h1>
      </div>

      {/* Image Canvas Container with Dynamic Filter Preview */}
      <div className={`relative group p-3 bg-slate-900/90 rounded-3xl border border-white/15 shadow-2xl overflow-hidden w-full ${currentAspect.class} transition-all duration-500 min-h-[300px]`}>
        <div className="relative overflow-hidden rounded-2xl w-full h-full flex flex-col items-center justify-center bg-slate-950/90 border border-white/5">
          {isImageLoaded ? (
            <img 
              src={image} 
              alt="AI Preview" 
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%) grayscale(${grayscale}%)`
              }}
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

          {/* Optional Watermark Overlay */}
          {isImageLoaded && showWatermark && (
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-purple-300 pointer-events-none flex items-center gap-1 shadow-lg">
              <span>✨ Imagify AI Studio</span>
            </div>
          )}

          {/* Loading Animation Overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md z-30">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
              <p className="text-purple-300 font-bold text-sm animate-pulse">Synthesizing Artwork ({selectedStyle})...</p>
              <p className="text-slate-400 text-xs mt-1 font-light">Transforming prompt tokens into pixels</p>
            </div>
          )}

          {/* Glowing Status Bar */}
          <span
            className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 ${
              loading ? "w-full transition-all duration-[10s] ease-out" : "w-0"
            }`}
          />
        </div>
      </div>

      {/* Main Controls Form */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-3xl mt-8">
        
        {/* Style Synthesizer Selector */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2 text-center">
            Select AI Synthesizer Style
          </label>
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

        {/* Prompt Input Control Bar with Magic Enhancer */}
        <div className="flex flex-col sm:flex-row items-center gap-2 glass-panel p-2 rounded-3xl border border-white/15 shadow-2xl focus-within:border-purple-500/80 focus-within:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe your prompt (e.g., Cyberpunk dragon over neon city)..."
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
              <span>{enhancing ? "Magic..." : "🪄 Enhance"}</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="glow-gradient text-white font-bold px-7 py-2.5 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 text-sm flex items-center gap-2"
            >
              <span>{loading ? "Synthesizing..." : "Generate"}</span>
              {!loading && <img src={assets.star_group} alt="stars" className="h-4 filter brightness-0 invert" />}
            </button>
          </div>
        </div>

        {/* Advanced Settings Toggle Button */}
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-slate-400 hover:text-purple-300 font-medium cursor-pointer"
          >
            {showAdvanced ? "▲ Hide Advanced Config" : "▼ Show Aspect Ratio & Negative Prompts"}
          </button>
        </div>

        {/* Advanced Config Section */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-5 glass-panel rounded-3xl border border-white/10 space-y-4 text-left"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Aspect Ratio Format</label>
              <div className="flex gap-2">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    type="button"
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      aspectRatio === ratio.id
                        ? "bg-purple-900/60 border-purple-400 text-white"
                        : "bg-slate-900/60 border-white/10 text-slate-400"
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Negative Prompt (Exclude Artifacts)</label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="e.g. blurry, distortion, low quality, extra limbs..."
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none placeholder-slate-400"
              />
            </div>
          </motion.div>
        )}
      </form>

      {/* Live Canvas Post-Processing Editor (Available After Generation) */}
      {isImageLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl mt-8 glass-panel p-6 rounded-3xl border border-white/15 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>🎛️ Live Canvas Post-Processing FX</span>
            </h3>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-0"
                />
                <span>Watermark</span>
              </label>

              <button
                onClick={resetFilters}
                className="text-xs text-purple-400 hover:text-purple-300 underline font-medium cursor-pointer"
              >
                Reset FX
              </button>
            </div>
          </div>

          {/* Preset Filters */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-400 block mb-2">Preset Filters:</span>
            <div className="flex flex-wrap gap-2">
              {['none', 'cyberpunk', 'vintage', 'noir'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-1 rounded-xl text-xs capitalize font-medium transition-all ${
                    activePreset === p
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-slate-900/60 text-slate-300 border border-white/10"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="flex justify-between text-slate-300 mb-1">
                <span>Brightness</span> <span>{brightness}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="flex justify-between text-slate-300 mb-1">
                <span>Contrast</span> <span>{contrast}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="180"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="flex justify-between text-slate-300 mb-1">
                <span>Saturation</span> <span>{saturate}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={saturate}
                onChange={(e) => setSaturate(e.target.value)}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      )}

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

          <a
            href={image}
            download="imagify_studio_artwork.png"
            className="glow-gradient text-white font-bold px-10 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-sm flex items-center gap-2"
          >
            <span>Download Masterwork</span>
            <span className="text-xs">↓</span>
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default Result;
