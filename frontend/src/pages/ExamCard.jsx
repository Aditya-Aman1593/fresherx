import React from 'react';
import {Link} from 'react-router-dom'
import Cards from '../components/Functional/Cards';
function ExamCards() {
  const cardsData = [
    { title: 'Frontend WD', content: 'Scan you resume to check if it is', imageUrl: 'https://img.freepik.com/premium-vector/resume-keyword-scanner-icon-vector-image-can-be-used-recruitment-agency_120816-223919.jpg', path: "/" },
    { title: 'Backend WD', content: 'Run & Debug you code here for more', imageUrl: 'https://cdn.dribbble.com/users/267693/screenshots/4787517/attachments/1077018/code.png',  path: "/"},
    { title: 'JAVA', content: 'java mern stack dbms cn c++ aws ', imageUrl: 'https://www6.royalbank.com/assets/di-secure/images/article/investing-academy/2020/practice-trading-options-hero-609x414.jpg', path: "/"},
    { title: 'DSA', content: 'Elevate your exam prep with real-time', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTijph7N_6kg108oDfCalq50lN_SySyF77otw&s', path: "/"},
    { title: 'DBMS/CN/Aptitude', content: 'Get top companies resources here', imageUrl: 'https://media.licdn.com/dms/image/v2/C4D12AQGUCVanJ4Fd6g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520120323599?e=2147483647&v=beta&t=Au9x8sns2MMc85CG0DouxqOz9S1HrigULAUkZJ9L4_o', path: "/"},
    { title: 'Data Analytics', content: 'Elevate your exam prep with real-time', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTijph7N_6kg108oDfCalq50lN_SySyF77otw&s', path: "/"},
  ];

  return (
      <div className='bg-gray-100 mx-4 mt-10 rounded-3xl'>
            <h1 className='text-center text-4xl font-bold'>Quick Links</h1>
      <div className=" p-6 flex flex-wrap gap-8 justify-center  sm:justify-start">
        {cardsData.map((card, index) => (
        
        <Link key={index} to={`${card.path}`}>
        <div className="w-62 hover:scale-105 duration-500">
          <Cards {...card} />
        </div>
      </Link>
        ))}
      
    </div>
      </div> 
  );
}

export default ExamCards;
