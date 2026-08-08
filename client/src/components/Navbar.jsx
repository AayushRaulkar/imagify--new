import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-4 z-50 flex items-center justify-between py-3 px-5 sm:px-8 my-4 rounded-2xl glass-panel border border-white/15 shadow-2xl backdrop-blur-2xl"
    >
      {/* High-Contrast Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          src={assets.logo} 
          alt="Imagify Logo" 
          className="w-28 sm:w-32 lg:w-36 logo-invert transition-transform duration-300" 
        />
      </Link>

      <div className="flex items-center gap-3 sm:gap-5">
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168,85,247,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-900/70 via-indigo-900/70 to-purple-900/70 border border-purple-500/50 px-4 sm:px-6 py-2 rounded-full transition-all duration-300 cursor-pointer shadow-lg"
            >
              <motion.img 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 sm:w-5 drop-shadow-[0_0_8px_rgba(234,179,8,0.9)]" 
                src={assets.credit_star} 
                alt="credits" 
              />
              <p className="text-xs sm:text-sm font-semibold text-purple-200">
                Credits: <span className="text-amber-300 font-bold">{credit}</span>
              </p>
            </motion.button>

            <span className="text-slate-200 text-sm font-medium max-sm:hidden pl-1">
              Hi, <span className="text-purple-300 font-semibold">{user.name}</span>
            </span>

            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="p-0.5 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                <img
                  src={assets.profile_icon}
                  className="w-8 sm:w-9 rounded-full bg-slate-900"
                  alt="Profile"
                />
              </motion.div>

              <div className="absolute hidden group-hover:block top-full right-0 z-20 pt-2 w-36">
                <motion.ul 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="list-none m-0 p-1.5 bg-slate-900/95 border border-white/15 rounded-xl shadow-2xl backdrop-blur-2xl text-xs sm:text-sm"
                >
                  <li
                    onClick={logout}
                    className="py-2.5 px-3 text-slate-300 hover:text-red-400 hover:bg-slate-800/80 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-between font-medium"
                  >
                    <span>Logout</span>
                    <span className="text-xs opacity-60">↳</span>
                  </li>
                </motion.ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/buy")}
              className="text-slate-300 hover:text-purple-300 font-medium text-sm transition-colors duration-200 cursor-pointer"
            >
              Pricing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(139,92,246,0.7)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="glow-gradient text-white px-6 sm:px-8 py-2 text-sm font-semibold rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300 cursor-pointer"
            >
              Login
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
