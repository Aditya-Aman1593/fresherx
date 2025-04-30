import React, { useState, useRef, useEffect } from 'react';
import { LANGUAGE_VERSIONS } from './constants';

const languagesArray = Object.entries(LANGUAGE_VERSIONS);

function CodeLanguageSelector({ language, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <div className="relative inline-block" ref={menuRef}>
        <button 
          onClick={toggleMenu} 
          className="px-4 py-2 bg-blue-600 text-white rounded inline-flex items-center focus:outline-none"
        >
          <span>{language}</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute mt-2 w-38 bg-white border border-gray-200 rounded shadow-lg z-10">
            {languagesArray.map(([lang, ver]) => (
              <li 
              key={lang}
              onClick={() => handleItemClick(lang)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${lang === language ? 'text-blue-500' : 'text-black'}`}
            >
                {lang} {ver}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CodeLanguageSelector;
