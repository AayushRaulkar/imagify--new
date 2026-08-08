import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const samplePrompts = [
    "Cyberpunk neon street at midnight",
    "Surreal floating island above clouds",
    "Hyperrealistic cinematic dragon portrait",
    "Futuristic glowing AI space station"
  ]

  const onClickHandler = (promptText) => {
    if (user) {
      navigate('/result', { state: { prompt: typeof promptText === 'string' ? promptText : '' } })
    } else {
      setShowLogin(true)
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center text-center my-10 sm:my-16 px-4">
      {/* Floating Side Showcase Card Left */}
      <motion.div 
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden xl:flex absolute top-10 -left-12 flex-col gap-2 p-2.5 bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl animate-float-slow pointer-events-none z-0"
      >
        <img src={assets.sample_img_2} alt="AI Artwork" className="w-36 h-36 object-cover rounded-xl" />
        <div className="text-left px-1">
          <p className="text-[11px] font-bold text-slate-200">Cyberpunk Owl</p>
          <p className="text-[9px] text-purple-300 font-mono">Prompt: Neon Cyberpunk</p>
        </div>
      </motion.div>

      {/* Floating Side Showcase Card Right */}
      <motion.div 
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="hidden xl:flex absolute top-28 -right-12 flex-col gap-2 p-2.5 bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl animate-float-medium pointer-events-none z-0"
      >
        <img src={assets.sample_img_1} alt="AI Artwork" className="w-36 h-36 object-cover rounded-xl" />
        <div className="text-left px-1">
          <p className="text-[11px] font-bold text-slate-200">Surreal Dreamscape</p>
          <p className="text-[9px] text-cyan-300 font-mono">Prompt: Hyperrealistic 4K</p>
        </div>
      </motion.div>

      {/* Top Pulsing Badges */}
      <div className="flex flex-wrap justify-center items-center gap-3 relative z-10 mb-4">
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Google Gemini AI Engine</span>
          <motion.img 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            src={assets.star_icon} 
            alt="star" 
            className="w-4 h-4 filter drop-shadow-[0_0_6px_rgba(234,179,8,0.9)]" 
          />
        </motion.div>
      </div>

      {/* Hero Title */}
      <motion.h1
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-4xl mx-auto mt-4 tracking-tight leading-tight relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Turn text into{' '}
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.6)]"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          stunning visual art
        </motion.span>
        , instantly.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed font-light relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your imagination powered by multi-model generative AI & automatic prompt enhancement. Type any prompt and synthesize masterworks in seconds.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={() => onClickHandler()}
        className="sm:text-lg text-white font-bold glow-gradient px-10 py-4 mt-8 flex items-center gap-3 rounded-full shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:shadow-[0_0_60px_rgba(124,58,237,0.9)] transition-all duration-300 cursor-pointer relative z-10"
        whileHover={{ scale: 1.08, rotate: [0, -1, 1, 0] }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span>Open AI Studio</span>
        <motion.img 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-6 filter brightness-0 invert" 
          src={assets.star_group} 
          alt="stars" 
        />
      </motion.button>

      {/* Live System Performance Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full my-10 p-5 rounded-3xl glass-panel border border-white/15 relative z-10 shadow-2xl"
      >
        <div className="text-center">
          <p className="text-2xl font-black text-purple-400">12,450+</p>
          <p className="text-xs text-slate-300 font-light">Artworks Synthesized</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-indigo-400">5 Models</p>
          <p className="text-xs text-slate-300 font-light">AI Art Engines</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-cyan-400">&lt; 2.4 sec</p>
          <p className="text-xs text-slate-300 font-light">Average Inference</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-emerald-400">99.4%</p>
          <p className="text-xs text-slate-300 font-light">System Uptime</p>
        </div>
      </motion.div>

      {/* Sample Preset Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-wrap justify-center items-center gap-2 max-w-3xl relative z-10"
      >
        <span className="text-xs text-purple-300 font-semibold mr-1">Try prompting:</span>
        {samplePrompts.map((prompt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClickHandler(prompt)}
            className="text-xs bg-slate-900/80 hover:bg-purple-900/50 border border-white/15 hover:border-purple-400/60 text-slate-200 hover:text-white px-4 py-2 rounded-full transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md"
          >
            "{prompt}"
          </motion.button>
        ))}
      </motion.div>

      {/* Image Gallery Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="flex flex-wrap justify-center mt-12 gap-4 p-4 rounded-3xl glass-panel border border-white/15 relative z-10 shadow-2xl"
      >
        {Array(6)
          .fill('')
          .map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.12, y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative overflow-hidden rounded-2xl border border-white/15 shadow-xl group cursor-pointer"
            >
              <img
                className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                alt={`Sample ${index + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-1.5">
                <span className="text-[10px] text-purple-200 font-bold tracking-wider uppercase">Try Prompt</span>
              </div>
            </motion.div>
          ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mt-5 text-xs sm:text-sm text-slate-400 font-light relative z-10"
      >
        ⚡ Join thousands of creators crafting AI art on Imagify
      </motion.p>
    </div>
  )
}

export default Header
