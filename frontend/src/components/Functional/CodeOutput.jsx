import React, { useState } from 'react'
import { executeCode } from './api';

function CodeOutput({editorRef, language}) {

const[output,setoutput] =useState(null)
const[isLoading,setIsLoading] = useState(false)

async function runCode(){
const sourceCode = editorRef.current.getValue()
if(!sourceCode) return;
try {
    setIsLoading(true)
    const {run:result} = await executeCode(language,sourceCode)
    setoutput(result.output.split("\n"))
} catch (error) {
    console.log(error)
}
finally{
    setIsLoading(false)
}
}

    return (
        <div className='w-[40%] p-4'>
            <button
                className="px-4 py-2 m-2 bg-green-600 text-white rounded hover:bg-green-700" 
                onClick={runCode}>{isLoading ?  "Processing..." : "RunCode"}</button>
            <div className='h-[80vh] p-2  bg-gray-800 text-white'>
        {
            output ? output.map((line,i) =>(
                <p key={i}>{line}</p>
            )) : "click run to see output"
        }
            </div>
        </div>
    )
}

export default CodeOutput