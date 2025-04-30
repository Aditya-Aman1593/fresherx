import React, { useState, useRef } from 'react';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown-styles.css';
import Navbar from '../components/UI/Navbar';

function Resume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResult("");  // Clear previous result if any
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await Axios.post("http://localhost:5000/generate", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error uploading file:", error);
      setResult("Error generating result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className='text-4xl text-center font-bold p-2'>Resume Screener</h1>
      <div className='flex flex-col h-[78vh] md:flex-row md:gap-4 bg-gray-100 m-4 p-6 rounded-2xl'>

        <div className='flex flex-col gap-7 w-full md:w-1/3 border border-gray-400 rounded-2xl p-6'>
          <form onSubmit={handleSubmit} className="mb-4">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="application/pdf" 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <div className='flex items-center justify-center'>
              <div className='flex flex-col gap-4 items-center'>
                <div className='w-74 h-74 border border-gray-400 rounded-2xl p-4'>
                  <p className='text-center text-2xl font-semibold p-2 text-red-500'>Instructions</p>
                  <ul className="list-disc pl-6 text-gray-700 text-sm">
                    <li>Only PDF files are accepted for resume uploads.</li>
                    <li>Ensure your resume file size does not exceed 5 MB.</li>
                    <li>Your resume should be clear, legible, and professionally formatted.</li>
                    <li>Double-check your resume content for accuracy before uploading.</li>
                    <li>Use a professional file name without special characters.</li>
                  </ul>
                </div>
                <button 
                  type="button"
                  onClick={handleChooseFile}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Choose File
                </button>
                {file && (
                  <div>
                    <p>Selected File: {file.name}</p>
                  </div>
                )}
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {loading ? "Processing..." : "Upload"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className='w-full md:w-2/3 border border-gray-400 rounded-2xl p-6 mt-6 md:mt-0'>
          <div className='w-full max-h-full overflow-auto'>
            {loading ? (
              <div className="mt-40 flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-600 text-lg font-semibold">Processing your resume...</p>
              </div>
            ) : (
              result && (
                <div className="markdown-body bg-gray-100 p-4 rounded shadow">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result}
                  </ReactMarkdown>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Resume;
