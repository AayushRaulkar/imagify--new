import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='my-20 text-center relative overflow-hidden glass-panel p-12 sm:p-16 rounded-3xl border border-white/15 shadow-2xl'
    >
      {/* Background Animated Glowing Light Orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/25 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-cyan-600/20 rounded-full blur-[90px] pointer-events-none animate-pulse-glow" />

      <motion.h1 
        whileInView={{ scale: [0.95, 1] }}
        transition={{ duration: 0.6 }}
        className='text-3xl sm:text-5xl font-extrabold text-gradient mb-4 max-w-2xl mx-auto leading-tight relative z-10'
      >
        See the magic happen. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">Start creating today.</span>
      </motion.h1>

      <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-md mx-auto font-light relative z-10">
        No design skills required. Just type your ideas and let Google Gemini AI do the heavy lifting.
      </p>

      <motion.button 
        onClick={onClickHandler}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className='inline-flex items-center gap-3 px-10 py-4 rounded-full glow-gradient text-white text-base font-bold shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:shadow-[0_0_60px_rgba(124,58,237,0.9)] transition-all duration-300 cursor-pointer relative z-10'
      >
        <span>Generate Images</span> 
        <motion.img 
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          src={assets.star_group} 
          alt="stars" 
          className='h-6 filter brightness-0 invert'
        />
      </motion.button>
    </motion.div>
  )
}

export default GenerateBtn
