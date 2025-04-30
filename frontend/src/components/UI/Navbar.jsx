import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
     
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">FresherX</Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-4">
            {/* <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              About
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Services
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Help
            </a>
            <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </a> */}
            <LogoutButton/>
          </div>
          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 text-center">
            {/* <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Services
            </a>
            <a href="#" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </a> */}
            <LogoutButton/>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
