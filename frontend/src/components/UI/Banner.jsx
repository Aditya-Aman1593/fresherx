import React from 'react';

function Banner() {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-400 p-8 min-h-[75vh]">
     
      <div className="md:w-1/2 text-left">
        <h1 className="text-4xl font-bold mb-4">Empowering Freshers to Unlock Their Full Potential. </h1>
        <p className="text-lg text-gray-700">
        Join us to unlock your potential, develop industry-ready competencies, and confidently launch your career journey today. Start now, succeed.
        </p>
        <button className="mt-4 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 hover:scale-105 duration-500">
          Learn More
        </button>
      </div>
    
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src="https://plasma.coveo.com/assets/CodeEditor-Bu-pz_XT.png"
          alt="Beautiful Landscape"
          className="w-full h-auto scale-120"
        />
      </div>
    </div>
  );
}

export default Banner;
