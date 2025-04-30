import React, { useEffect, useState } from 'react'
import Navbar from './components/UI/Navbar';
import Banner from './components/UI/Banner';
import FunctionalCards from './components/UI/FunctionalCards';
import Footer from './components/UI/Footer';
import Contactus from './components/UI/Contactus';
import Resume from './pages/Resume';
import {  Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import CodeEditor from './pages/CodeEditor';
import ExamCards from './pages/ExamCard';
import MockTest from './pages/MockTest';
import PracticeMcq from './pages/PracticeMcq';
import Signup from './components/Functional/Signup';
import Login from './components/Functional/Login';
import ProtectedRoute from './components/Functional/ProtectedRoute';

function App() {

  return (
    <div>
      {/* <Navbar/>
      <Banner/>
      <FunctionalCards/>
      <Contactus/>
      <Footer/>
      <Resume/> */}

      
      <Routes>
        {/* <Route path='/' element={<LandingPage/>}/> */}
        <Route
        path="/"
        element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        }
      />
      <Route path='/resume' element={<Resume/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/codeeditor' element={<CodeEditor/>}/>
      <Route path='/examsection' element={<MockTest/>}/>
      <Route path='/practicemcq' element={<PracticeMcq/>}/>
      </Routes>
      
    </div>
  )
}

export default App