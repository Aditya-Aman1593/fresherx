import React from 'react';


function Cards({ title, content, imageUrl }) {
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <img src={imageUrl} alt={title} className="w-full p-4 h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 line-clamp-1">{content}</p>
      </div>
    </div>
  )
}

export default Cards
