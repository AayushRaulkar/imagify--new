 

import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import ArchitectureModal from './components/ArchitectureModal';
import { AppContext } from './context/AppContext';

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className='relative min-h-screen bg-[#050811] bg-grid-pattern text-slate-100 selection:bg-purple-500 selection:text-white overflow-hidden'>
      {/* Dynamic Floating Background Light Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 80, -40, 0], 
          y: [0, -60, 50, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className='fixed top-0 -left-20 w-96 h-96 bg-purple-600/25 rounded-full blur-[140px] pointer-events-none' 
      />
      <motion.div 
        animate={{ 
          x: [0, -90, 60, 0], 
          y: [0, 80, -50, 0],
          scale: [1, 0.9, 1.25, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className='fixed top-1/3 -right-20 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none' 
      />
      <motion.div 
        animate={{ 
          x: [0, 70, -60, 0], 
          y: [0, -50, -90, 0],
          scale: [1, 1.15, 0.95, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className='fixed -bottom-20 left-1/3 w-[35rem] h-[35rem] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none' 
      />

      <div className='relative z-10 px-4 sm:px-10 md:px-14 lg:px-28 max-w-7xl mx-auto min-h-screen flex flex-col justify-between'>
        <ToastContainer position='bottom-right' theme='dark' toastClassName='bg-slate-900/90 border border-slate-700/60 text-slate-100 rounded-xl backdrop-blur-md' />

        <Navbar />

        {showLogin && <Login />}
        <ArchitectureModal />

        {/* Routes */}
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/result' element={<Result />} />
            <Route path='/buy' element={<BuyCredit />} />
            <Route path='/gallery' element={<Gallery />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
