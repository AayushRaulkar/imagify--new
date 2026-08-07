import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonial = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-8 px-4"
    >
      <div className="inline-block px-4 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
        Loved By Creators
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 text-center text-gradient">
        Customer Testimonials
      </h1>
      <p className="text-slate-400 mb-12 text-center text-base sm:text-lg font-light">
        See what artists, designers, and innovators are saying about Imagify
      </p>

      <div className='flex flex-wrap justify-center gap-6 max-w-6xl w-full'>
        {testimonialsData.map((testimonial, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className='glass-panel glass-panel-hover p-8 sm:p-10 rounded-3xl border border-white/10 w-full md:w-80 flex flex-col items-center text-center relative overflow-hidden group shadow-xl'
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

            <div className="p-1 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-md mb-4">
              <img src={testimonial.image} alt={testimonial.name} className='rounded-full w-14 h-14 object-cover bg-slate-900' />
            </div>

            <h2 className='text-lg font-bold text-slate-100 group-hover:text-purple-200 transition-colors'>{testimonial.name}</h2>
            <p className='text-purple-400 text-xs font-medium mb-4'>{testimonial.role}</p>

            <div className='flex gap-1 mb-4 bg-slate-900/60 px-3 py-1 rounded-full border border-white/5'>
              {Array(testimonial.stars).fill().map((_, starIndex) => (
                <img key={starIndex} src={assets.rating_star} alt="star" className="w-4 h-4 filter drop-shadow-[0_0_4px_rgba(234,179,8,0.8)]" />
              ))}
            </div>

            <p className='text-sm text-slate-300 font-light leading-relaxed italic'>
              "{testimonial.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonial
