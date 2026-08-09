import React, { useEffect } from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  useEffect(() => {
    document.title = "Imagify - Google Gemini AI Image Generator Studio";
  }, []);

  return (
    <div>
       <Header/>
       <Steps/>
       <Description/>
       <Testimonial/>
       <GenerateBtn/>
    </div>
  )
}

export default Home
