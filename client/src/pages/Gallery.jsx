import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Gallery = () => {
  const { userHistory, deleteHistoryItem, user, setShowLogin } = useContext(AppContext);
  const [selectedStyleFilter, setSelectedStyleFilter] = useState('All');
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Sign in to view your gallery</h2>
        <p className="text-slate-400 mb-6 text-sm">Create an account or login to access your personal AI creations.</p>
        <button
          onClick={() => setShowLogin(true)}
          className="glow-gradient px-8 py-3 rounded-full text-white font-bold text-sm cursor-pointer shadow-lg"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const stylesList = ['All', 'Photorealistic', 'Cinematic', 'Cyberpunk', 'Anime', '3D Render'];

  const filteredHistory = selectedStyleFilter === 'All'
    ? userHistory
    : userHistory.filter(item => item.style === selectedStyleFilter);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard! 📋");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[82vh] py-10 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          Personal Portfolio
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gradient mb-3">
          Your Creation Gallery
        </h1>
        <p className="text-slate-400 text-sm sm:text-base font-light max-w-md mx-auto">
          Manage, download, and review all AI artworks synthesized under your account.
        </p>
      </div>

      {/* Style Filter Bar */}
      {userHistory.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {stylesList.map((style, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStyleFilter(style)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedStyleFilter === style
                  ? "glow-gradient text-white shadow-lg"
                  : "bg-slate-900/60 text-slate-300 hover:bg-purple-900/30 border border-white/10"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center max-w-md mx-auto my-12 shadow-2xl">
          <div className="text-4xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">No creations found</h3>
          <p className="text-slate-400 text-sm font-light mb-6">
            {selectedStyleFilter === 'All'
              ? "You haven't generated any AI images yet."
              : `No artwork generated with style "${selectedStyleFilter}".`}
          </p>
          <button
            onClick={() => navigate('/result')}
            className="glow-gradient px-8 py-3 rounded-full text-white font-bold text-sm shadow-lg cursor-pointer"
          >
            Synthesize Your First Art
          </button>
        </div>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredHistory.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass-panel glass-panel-hover rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between shadow-2xl group"
            >
              {/* Image Box */}
              <div className="relative overflow-hidden aspect-square bg-slate-950">
                <img
                  src={item.resultImage}
                  alt={item.prompt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-bold text-purple-300">
                  {item.style || 'Photorealistic'}
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-mono text-slate-300">
                  {item.aspectRatio || '1:1'}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-sm font-semibold text-slate-100 line-clamp-2 leading-relaxed">
                    "{item.prompt}"
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-2">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => copyToClipboard(item.prompt)}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-purple-300 text-xs transition-all cursor-pointer"
                    title="Copy Prompt"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={() => navigate('/result', { state: { prompt: item.prompt } })}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-cyan-300 text-xs transition-all cursor-pointer"
                    title="Re-generate"
                  >
                    🔄 Re-Use
                  </button>

                  <a
                    href={item.resultImage}
                    download={`imagify_${item._id}.png`}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-emerald-300 text-xs transition-all cursor-pointer"
                    title="Download"
                  >
                    ↓ Save
                  </a>

                  <button
                    onClick={() => deleteHistoryItem(item._id)}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-red-950/60 border border-white/10 text-slate-400 hover:text-red-400 text-xs transition-all cursor-pointer ml-auto"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Gallery;
