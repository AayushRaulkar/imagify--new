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
      className='my-20 text-center relative overflow-hidden glass-panel p-12 sm:p-16 rounded-3xl border border-white/10 shadow-2xl'
    >
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <h1 className='text-3xl sm:text-5xl font-extrabold text-gradient mb-4 max-w-2xl mx-auto leading-tight'>
        See the magic happen. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">Start creating today.</span>
      </h1>
      <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-md mx-auto font-light">
        No design skills required. Just type your ideas and let AI do the heavy lifting.
      </p>

      <motion.button 
        onClick={onClickHandler}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className='inline-flex items-center gap-3 px-10 py-4 rounded-full glow-gradient text-white text-base font-bold shadow-[0_0_35px_rgba(124,58,237,0.5)] hover:shadow-[0_0_50px_rgba(124,58,237,0.8)] transition-all duration-300 cursor-pointer'
      >
        <span>Generate Images</span> 
        <img src={assets.star_group} alt="stars" className='h-6 filter brightness-0 invert'/>
      </motion.button>
    </motion.div>
  )
}

export default GenerateBtn
