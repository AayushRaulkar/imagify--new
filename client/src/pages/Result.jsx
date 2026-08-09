import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const STUDENT_PROMPTS = [
  "DNA double helix molecular structure, biology textbook diagram, detailed 8K",
  "Solar system planets orbiting the sun, astronomy educational illustration",
  "Ancient Roman Colosseum architectural reconstruction, history textbook visual",
  "Electric motor circuit schematic blueprint, engineering technical diagram",
  "Photosynthesis process in green plant leaf, botany science diagram",
  "Human brain anatomy with colored neural lobes, medical science illustration"
];

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
  const [lighting, setLighting] = useState('Default');
  const [lens, setLens] = useState('Default');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isEduMode, setIsEduMode] = useState(false);

  const { generateImage, enhancePromptApi } = useContext(AppContext);

  useEffect(() => {
    document.title = "AI Student & Creation Studio - Imagify";
    if (location.state?.prompt) {
      setInput(location.state.prompt);
    }
  }, [location.state]);

  const [engineName, setEngineName] = useState("Google Gemini AI");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    let enrichedPrompt = input;
    if (isEduMode) enrichedPrompt += ", educational textbook diagram, high clarity, clean white background, detailed academic illustration";
    if (lighting !== 'Default') enrichedPrompt += `, ${lighting} lighting`;
    if (lens !== 'Default') enrichedPrompt += `, shot on ${lens} camera lens`;

    const res = await generateImage({
      prompt: enrichedPrompt,
      style: selectedStyle,
      aspectRatio,
      negativePrompt
    });

    if (res) {
      setIsImageLoaded(true);
      if (typeof res === 'object' && res.resultImage) {
        setImage(res.resultImage);
        setEngineName(res.engineUsed || "Google Gemini AI");
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

  const handleEduPromptSelect = (promptText) => {
    setInput(promptText);
    setSelectedStyle('Scientific Diagram');
    setIsEduMode(true);
  };

  const styles = [
    { id: 'Photorealistic', name: '📷 Photorealistic' },
    { id: 'Scientific Diagram', name: '🧪 Science & Diagram' },
    { id: 'Infographic Slide', name: '📊 Edu Presentation' },
    { id: 'Engineering Blueprint', name: '📐 Tech Blueprint' },
    { id: 'Anime', name: '🎨 Anime Art' },
    { id: '3D Render', name: '🍿 3D Pixar' },
  ];

  const aspectRatios = [
    { id: '1:1', label: '1:1 Square', class: 'aspect-square max-w-md' },
    { id: '16:9', label: '16:9 Widescreen (Slides)', class: 'aspect-video max-w-xl' },
    { id: '9:16', label: '9:16 Mobile Poster', class: 'aspect-[9/16] max-w-xs' },
  ];

  const lightingPresets = ['Default', 'Cinematic Warm', 'Studio White (Edu)', 'Golden Hour', 'Cyber Neon'];
  const lensPresets = ['Default', 'Macro Zoom (Science)', 'Wide Angle (Slides)', '85mm Portrait', 'Drone View'];

  const currentAspect = aspectRatios.find(a => a.id === aspectRatio) || aspectRatios[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col min-h-[82vh] justify-center items-center py-8 px-4 max-w-5xl mx-auto"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>🎓 Student & Creator AI Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gradient">
          Generate AI Visuals & Diagrams
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto font-light">
          Create presentation graphics, science diagrams, blueprints, and digital art powered by Google Gemini AI.
        </p>
      </div>

      {/* Student Academic Mode Banner Toggle */}
      <div className="mb-6 flex flex-wrap justify-center items-center gap-3">
        <button
          type="button"
          onClick={() => setIsEduMode(!isEduMode)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shadow-lg ${
            isEduMode
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              : "bg-slate-900/80 text-emerald-400 border-emerald-500/40 hover:bg-emerald-950/40"
          }`}
        >
          <span>{isEduMode ? "✓ Student Academic Mode ON 🎓" : "🎓 Enable Student & Edu Mode"}</span>
        </button>
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
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-1">Student & Research Studio Canvas Ready</h3>
              <p className="text-xs text-slate-400 max-w-xs font-light">
                Type your topic below or select a <span className="text-purple-300 font-semibold">Student Topic Preset</span> to generate high-clarity study visuals.
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
              <p className="text-purple-300 font-bold text-sm animate-pulse">Synthesizing Visual ({selectedStyle})...</p>
              <p className="text-slate-400 text-xs mt-1 font-light">Generating crisp educational & scientific tokens</p>
            </div>
          )}
        </div>
      </div>

      {/* Student Topic Presets */}
      <div className="w-full max-w-3xl my-5">
        <p className="text-xs text-purple-300 font-semibold mb-2 text-center">🎓 Quick Student & Academic Topic Presets:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {STUDENT_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleEduPromptSelect(promptText)}
              className="text-[11px] bg-slate-900/80 hover:bg-emerald-950/60 border border-white/10 hover:border-emerald-400/50 text-slate-300 hover:text-emerald-200 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
            >
              "{promptText.split(',')[0]}"
            </button>
          ))}
        </div>
      </div>

      {/* Main Controls Form */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-3xl mt-2">
        
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
        <div className="flex flex-wrap justify-center gap-2 mb-4">
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

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3.5 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/10 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>⚙️ Advanced Options {showAdvanced ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* Collapsible Controls */}
        {showAdvanced && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass-panel p-4 rounded-2xl border border-white/10 mb-4 text-left space-y-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-purple-300 font-semibold w-24">Lighting:</span>
              <div className="flex flex-wrap gap-1.5">
                {lightingPresets.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLighting(l)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border cursor-pointer ${
                      lighting === l ? "bg-purple-600 text-white border-purple-400" : "bg-slate-900/80 text-slate-400 border-white/10"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-indigo-300 font-semibold w-24">Camera / Lens:</span>
              <div className="flex flex-wrap gap-1.5">
                {lensPresets.map((cam) => (
                  <button
                    key={cam}
                    type="button"
                    onClick={() => setLens(cam)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border cursor-pointer ${
                      lens === cam ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-900/80 text-slate-400 border-white/10"
                    }`}
                  >
                    {cam}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-xs text-slate-400 font-semibold w-24">Avoid (Negative):</span>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Elements to avoid (e.g. blur, distortion, extra fingers, text watermark)..."
                className="flex-1 bg-slate-950/80 border border-white/10 px-3 py-1 rounded-lg text-xs text-white outline-none"
              />
            </div>
          </motion.div>
        )}

        {/* Prompt Input Control Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 glass-panel p-2 rounded-3xl border border-white/15 shadow-2xl focus-within:border-purple-500/80 focus-within:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type your study topic or presentation graphic (e.g. DNA structure, Solar system, Roman Colosseum)..."
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
              download="imagify_student_visual.png"
              className="glow-gradient text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer text-sm flex items-center gap-2"
            >
              <span>Save for Presentation / Project</span>
              <span className="text-xs">↓</span>
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Result;
