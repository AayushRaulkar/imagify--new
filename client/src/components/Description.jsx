import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-12 relative"
    >
      <div className="inline-block px-4 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
        Unlimited Creativity
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 text-center text-gradient">
        Create AI Images
      </h1>
      <p className="text-slate-400 mb-12 text-center text-base sm:text-lg font-light">
        Turn your wildest imagination into stunning visuals in seconds
      </p>

      <div className="flex flex-col gap-10 lg:gap-16 lg:flex-row items-center justify-center max-w-6xl">
        {/* Image Showcase Frame with Ambient Glow & Animated Scanner Beam */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
          <div className="relative p-2.5 bg-slate-900 rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            {/* Animated Laser Scanner Line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(56,189,248,1)] z-20 animate-scan pointer-events-none" />

            <img
              src={assets.sample_img_1}
              alt="AI sample artwork"
              className="w-80 sm:w-96 xl:w-[26rem] h-auto rounded-2xl object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-white/15 text-xs text-purple-200 flex justify-between items-center z-10 shadow-lg">
              <span className="font-mono text-[11px]">Prompt: "Cyberpunk girl portrait"</span>
              <span className="bg-purple-600/70 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">4K Ultra</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Copy Box */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="max-w-xl glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-100 leading-tight">
            Introducing Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">AI-Powered</span> Generation
          </h2>

          <p className="text-slate-300 mb-4 font-light leading-relaxed text-sm sm:text-base">
            Easily bring your creative ideas to life. Whether you need stunning digital artwork, marketing graphics, character designs, or surreal concept art, Imagify turns text into visually captivating images with just a click.
          </p>

          <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
            Simply describe your vision, and our state-of-the-art AI model will materialize your request with photorealistic precision, vivid lighting, and unparalleled detail.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/15">
            <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/20">
              <p className="text-2xl font-black text-purple-400">100%</p>
              <p className="text-xs text-slate-300 font-medium">Custom Prompts</p>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/20">
              <p className="text-2xl font-black text-indigo-400">&lt; 3 sec</p>
              <p className="text-xs text-slate-300 font-medium">Lightning Fast</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


export default Description
