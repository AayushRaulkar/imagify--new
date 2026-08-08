import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonial = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 py-10 px-4 max-w-6xl mx-auto relative"
    >
      <div className="inline-block px-5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
        Loved By Creators Worldwide
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-center text-gradient leading-tight">
        What Our Users Say
      </h1>

      <p className="text-slate-400 mb-14 text-center text-base sm:text-lg font-light max-w-xl">
        Discover how designers, content creators, and AI enthusiasts use Imagify to power their visual workflows.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className='glass-panel glass-panel-hover p-8 rounded-3xl border border-white/15 flex flex-col justify-between relative overflow-hidden group shadow-2xl bg-slate-900/60'
          >
            {/* Ambient Background Light Circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/15 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/30 transition-all duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-600/25 transition-all duration-500" />

            <div>
              {/* Header Profile Info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative p-0.5 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-md">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className='rounded-full w-14 h-14 object-cover bg-slate-950' 
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full" title="Verified Creator" />
                </div>

                <div className="text-left">
                  <h3 className='text-base font-bold text-slate-100 group-hover:text-purple-200 transition-colors'>
                    {testimonial.name}
                  </h3>
                  <p className='text-purple-300 text-xs font-medium'>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Star Rating Pills */}
              <div className='inline-flex items-center gap-1.5 mb-5 bg-slate-950/80 px-3.5 py-1.5 rounded-full border border-white/10 shadow-inner'>
                {Array(testimonial.stars || 5).fill().map((_, starIndex) => (
                  <img 
                    key={starIndex} 
                    src={assets.rating_star} 
                    alt="star" 
                    className="w-4 h-4 filter drop-shadow-[0_0_6px_rgba(234,179,8,0.9)]" 
                  />
                ))}
                <span className="text-[11px] font-bold text-amber-300 ml-1">5.0</span>
              </div>

              {/* Quote Body */}
              <p className='text-slate-300 font-light text-sm sm:text-base leading-relaxed italic relative z-10'>
                "{testimonial.text}"
              </p>
            </div>

            {/* Bottom Verified Badge Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                ✓ Verified Creator
              </span>
              <span className="opacity-60">Imagify Pro</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonial
