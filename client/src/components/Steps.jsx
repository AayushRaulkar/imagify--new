import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Steps = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-24 sm:my-32 px-4'
    >
      <div className="inline-block px-4 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
        Simple Process
      </div>
      <h1 className='text-3xl sm:text-5xl font-extrabold mb-3 text-center text-gradient'>
        How it works
      </h1>
      <p className='text-base sm:text-lg text-slate-400 mb-12 text-center max-w-md font-light'>
        Transform simple text prompts into breathtaking visual masterworks in 3 steps
      </p>

      <div className='space-y-5 w-full max-w-3xl'>
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className='flex items-center gap-5 p-5 sm:p-6 px-6 sm:px-8 glass-panel glass-panel-hover rounded-2xl cursor-pointer group relative overflow-hidden'
          >
            {/* Step Index Badge */}
            <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-500/30 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 flex-shrink-0'>
              <span className="text-purple-300 font-extrabold text-lg">0{index + 1}</span>
            </div>

            <div className="flex-1">
              <h2 className='text-lg sm:text-xl font-bold text-slate-100 group-hover:text-purple-200 transition-colors'>
                {item.title}
              </h2>
              <p className='text-slate-400 text-sm mt-0.5 font-light leading-relaxed'>
                {item.description}
              </p>
            </div>

            <div className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
              <img width={24} src={item.icon} alt="" className="filter brightness-125 group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
