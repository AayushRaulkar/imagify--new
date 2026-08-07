

import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='relative mt-20 pt-8 pb-10 flex flex-col gap-6 text-slate-300 text-sm'>
      {/* Glowing Gradient Top Border Beam */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
        {/* Brand Logo & Copyright */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src={assets.logo} 
            alt="Imagify Logo" 
            className="w-28 sm:w-32 logo-invert" 
          />
          <span className='border-l border-white/20 pl-4 text-xs sm:text-sm text-slate-300 font-light max-sm:hidden'>
            Copyright © {year} <span className="text-purple-300 font-semibold">Aayush.dev</span> — All rights reserved.
          </span>
        </div>

        {/* Social Media Links with High Contrast SVGs */}
        <div className='flex items-center gap-3'>
          {/* Linkedin */}
          <motion.a 
            whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 20px rgba(0, 119, 181, 0.6)" }}
            whileTap={{ scale: 0.9 }}
            href="https://www.linkedin.com/in/aayush-raulkar/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-2.5 rounded-full bg-slate-900/90 border border-white/20 hover:border-blue-400 hover:bg-blue-600/20 text-slate-200 hover:text-white transition-all duration-300 shadow-lg group"
          >
            <svg className="w-4 h-4 fill-current group-hover:text-blue-400 transition-colors" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
            </svg>
          </motion.a>

          {/* GitHub */}
          <motion.a 
            whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/AayushRaulkar" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2.5 rounded-full bg-slate-900/90 border border-white/20 hover:border-purple-400 hover:bg-purple-600/20 text-slate-200 hover:text-white transition-all duration-300 shadow-lg group"
          >
            <svg className="w-4 h-4 fill-current group-hover:text-purple-300 transition-colors" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </motion.a>

          {/* Instagram */}
          <motion.a 
            whileHover={{ scale: 1.15, y: -3, boxShadow: "0 0 20px rgba(225, 48, 108, 0.6)" }}
            whileTap={{ scale: 0.9 }}
            href="https://www.instagram.com/aayush_raulkar?igsh=dmp3anc1a3o2cjBs" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Instagram"
            className="p-2.5 rounded-full bg-slate-900/90 border border-white/20 hover:border-pink-400 hover:bg-pink-600/20 text-slate-200 hover:text-white transition-all duration-300 shadow-lg group"
          >
            <svg className="w-4 h-4 fill-current group-hover:text-pink-400 transition-colors" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
