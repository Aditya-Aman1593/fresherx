import React, { useState } from 'react';
import Axios from 'axios';

function Contactus() {
  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  function handleChange(e){
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
   

    // console.log(data);
    

    try {
      const response = await Axios.post("http://localhost:5000/contact",data)
      alert(response.data)
    } catch (error) {
      console.log(error)
    }


    setData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className='mx-4 my-10 bg-gray-100 rounded-2xl  p-8'>
        
    <div className="max-w-2xl mx-auto bg-gray-200  p-6 rounded shadow">
      <h2 className="text-2xl text-center font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}  className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={data.subject}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={data.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div className=' flex items-center justify-center'>

        <button
          type="submit"
          className="w-96 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800 hover:scale-105 duration-500"
        >
          Send Message
        </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Contactus;
