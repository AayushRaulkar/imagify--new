import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ArchitectureModal = () => {
  const { showArchModal, setShowArchModal } = useContext(AppContext);

  if (!showArchModal) return null;

  const stackDetails = [
    { title: 'Frontend Framework', tech: 'React 19 + Vite + TailwindCSS + Framer Motion', color: 'from-purple-500 to-indigo-500' },
    { title: 'Backend Gateway', tech: 'Node.js + Express 5 + JWT Authentication', color: 'from-blue-500 to-cyan-500' },
    { title: 'Database & Storage', tech: 'MongoDB Atlas + Mongoose ODM (Users & History)', color: 'from-emerald-500 to-teal-500' },
    { title: 'AI Synthesis Engine', tech: 'ClipDrop API / SDXL / Multi-Model Prompt Expansion', color: 'from-pink-500 to-purple-500' },
    { title: 'Payment Integration', tech: 'Razorpay Payment Gateway SDK', color: 'from-amber-500 to-orange-500' },
  ];

  const pipelineSteps = [
    { step: '01', title: 'User Input & Prompt Enhancement', desc: 'Client captures prompt, model style, and aspect ratio. NLP algorithm enriches terms with art directives.' },
    { step: '02', title: 'Token Verification & Rate Limiting', desc: 'Express middleware verifies JWT auth bearer token & validates user credit balance in MongoDB.' },
    { step: '03', title: 'Multi-Model Generative Synthesis', desc: 'Backend compiles FormData payload and streams request to Generative AI engine.' },
    { step: '04', title: 'Base64 Stream & Auto-Save', desc: 'Binary buffer converted to Base64 URI. 1 Credit deducted & artwork saved to MongoDB History.' },
    { step: '05', title: 'Interactive Canvas Processing', desc: 'Client renders artwork with real-time post-processing filters (Brightness, Contrast, Watermark, Presets).' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-black/75 flex justify-center items-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="relative glass-modal p-6 sm:p-10 rounded-3xl w-full max-w-4xl border border-white/20 text-slate-200 shadow-2xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-purple-950/60 border border-purple-500/40">
                <img src={assets.logo} alt="Logo" className="w-24 logo-invert" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">System Architecture & Pipeline</h2>
                <p className="text-xs text-purple-300 font-mono">Final Year Major Engineering Project Blueprint</p>
              </div>
            </div>

            <button
              onClick={() => setShowArchModal(false)}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-white/15 text-slate-300 transition-all cursor-pointer"
            >
              <img src={assets.cross_icon} alt="Close" className="w-4 h-4 filter brightness-200" />
            </button>
          </div>

          {/* Technology Stack Grid */}
          <div className="my-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-4">Core Technology Stack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stackDetails.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl glass-panel border border-white/10 relative overflow-hidden">
                  <div className={`h-1 w-full bg-gradient-to-r ${item.color} absolute top-0 left-0`} />
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.title}</p>
                  <p className="text-sm font-bold text-slate-100 mt-1">{item.tech}</p>
                </div>
              ))}
            </div>
          </div>

          {/* End-to-End Execution Pipeline */}
          <div className="my-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 mb-4">End-to-End Execution Flow</h3>
            <div className="space-y-3">
              {pipelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
                  <span className="text-xs font-extrabold text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-500/30">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{step.title}</h4>
                    <p className="text-xs text-slate-300 font-light mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span>🎓 Designed for Academic Project Defense & Technical Evaluation</span>
            <button
              onClick={() => setShowArchModal(false)}
              className="glow-gradient px-6 py-2 rounded-full text-white font-bold text-xs shadow-lg cursor-pointer"
            >
              Close Blueprint
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ArchitectureModal;
