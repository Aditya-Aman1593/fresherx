import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className=" mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
        
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">FresherX</h2>
            <p className="text-sm">&copy; {new Date().getFullYear()} FresherX. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white text-sm">Home</a>
            <a href="#" className="hover:text-white text-sm">About</a>
            <a href="#" className="hover:text-white text-sm">Services</a>
            <a href="#" className="hover:text-white text-sm">Contact</a>
          </div>
        </div>
       
        <div className="text-center">
          <p className="text-xs">Follow us on:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white text-xs">Facebook</a>
            <a href="#" className="hover:text-white text-xs">Twitter</a>
            <a href="#" className="hover:text-white text-xs">Instagram</a>
            <a href="#" className="hover:text-white text-xs">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
