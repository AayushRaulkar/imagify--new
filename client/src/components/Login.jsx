import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState('Login')
    const { setShowLogin ,backendUrl,setToken,setUser} = useContext(AppContext)

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitHandler=async(e)=>{
        e.preventDefault();

        try {
            
            if(state==='Login'){
              const {data}  = await axios.post(backendUrl+'/api/user/login',{email,password})
                  
              if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
              }else{
                toast.error(data.message)
              }

            }else{
               const {data}  = await axios.post(backendUrl+'/api/user/register',{name,email,password})
                  
              if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
              }else{
                toast.error(data.message)
              } 
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-md bg-black/60 flex justify-center items-center p-4'>
            <motion.form 
                onSubmit={onSubmitHandler}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className='relative glass-modal p-8 sm:p-10 rounded-3xl w-full max-w-md border border-white/15 text-slate-200 shadow-2xl overflow-hidden'
            >
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

                <h1 className='text-center text-2xl sm:text-3xl font-extrabold text-white tracking-wide'>{state}</h1>
                <p className='text-xs sm:text-sm text-slate-400 text-center mt-1 mb-6 font-light'>
                    {state === 'Login' ? 'Welcome back! Please sign in to continue.' : 'Create an account to unlock AI image generation.'}
                </p>

                {state !== 'Login' && (
                    <div className='bg-slate-900/90 border border-white/10 px-5 py-3 flex items-center gap-3 rounded-2xl mt-4 focus-within:border-purple-500/80 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all'>
                        <img src={assets.user_icon} alt="" className="w-5 h-5 filter brightness-200 opacity-70" />
                        <input 
                            onChange={e => setName(e.target.value)} 
                            value={name} 
                            type="text" 
                            className='bg-transparent outline-none text-sm text-white placeholder-slate-400 w-full' 
                            placeholder='Full Name' 
                            required 
                        />
                    </div>
                )}

                <div className='bg-slate-900/90 border border-white/10 px-5 py-3 flex items-center gap-3 rounded-2xl mt-4 focus-within:border-purple-500/80 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all'>
                    <img src={assets.email_icon} alt="" className="w-5 h-5 filter brightness-200 opacity-70" />
                    <input 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        type="email" 
                        className='bg-transparent outline-none text-sm text-white placeholder-slate-400 w-full' 
                        placeholder='Email Address' 
                        required 
                    />
                </div>

                <div className='bg-slate-900/90 border border-white/10 px-5 py-3 flex items-center gap-3 rounded-2xl mt-4 focus-within:border-purple-500/80 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all'>
                    <img src={assets.lock_icon} alt="" className="w-5 h-5 filter brightness-200 opacity-70" />
                    <input 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        type="password" 
                        className='bg-transparent outline-none text-sm text-white placeholder-slate-400 w-full' 
                        placeholder='Password' 
                        required 
                    />
                </div>

                {state === 'Login' && (
                    <div className="text-right mt-3">
                        <span className='text-xs text-purple-400 hover:text-purple-300 cursor-pointer font-medium transition-colors'>
                            Forgot password?
                        </span>
                    </div>
                )}

                <button className='glow-gradient w-full text-white font-bold py-3.5 rounded-2xl mt-6 shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.8)] transition-all duration-300 active:scale-[0.98] cursor-pointer capitalize text-sm'>
                    {state === 'Login' ? 'Sign In' : 'Create Account'}
                </button>

                {state === 'Login' ? (
                    <p className='mt-6 text-center text-xs text-slate-400 font-light'>
                        Don't have an account?{' '}
                        <span className='text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors' onClick={() => setState('Sign Up')}>
                            Sign Up
                        </span>
                    </p>
                ) : (
                    <p className='mt-6 text-center text-xs text-slate-400 font-light'>
                        Already have an account?{' '}
                        <span className='text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors' onClick={() => setState('Login')}>
                            Sign In
                        </span>
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className='absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-300 transition-all cursor-pointer'
                >
                    <img
                        src={assets.cross_icon}
                        alt="Close"
                        className='w-3.5 h-3.5 filter brightness-200'
                    />
                </button>

            </motion.form>
        </div>
    )
}

export default Login


