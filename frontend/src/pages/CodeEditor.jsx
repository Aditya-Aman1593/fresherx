import React from 'react'
import Navbar from '../components/UI/Navbar'
import Codeedit from '../components/Functional/Codeedit'
import CodeLanguageSelector from '../components/Functional/CodeLanguageSelector'

function CodeEditor() {
  return (
    <div>
        <Navbar/>
    {/* <div className=' bg-gray-600 px-6 py-8'> */}
        
        <Codeedit/>
    {/* </div> */}

    </div>
        
  )
}

export default CodeEditor