import React from 'react'
import Navbar from '../components/UI/Navbar'
import Banner from '../components/UI/Banner'
import FunctionalCards from '../components/UI/FunctionalCards'
import Contactus from '../components/UI/Contactus'
import Footer from '../components/UI/Footer'
import { Outlet } from 'react-router-dom'



function LandingPage() {
  return (
    <div>
        <Navbar/>
        
      <Banner/>
      <FunctionalCards/>
      <Contactus/>
      <Footer/>
    </div>
  )
}

export default LandingPage