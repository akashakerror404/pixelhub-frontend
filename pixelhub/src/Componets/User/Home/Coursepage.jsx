import React, { useState, useEffect } from 'react';
import Customenavbar from '../Navbar/Customenavbar';
import Coursecardmain from './Coursecardmain';
import Coursefilter from './Coursefilter';
import Search from './Search';
import axios from '../../../axios';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import {BiSolidOffer} from 'react-icons/bi';
import Lottie from 'lottie-react'
import loadingani from '../../../Animations/loding.json';
import Footer from '../Home/Footer';

function Coursepage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get('/courses_all')
      .then((response) => {
        setCourses(response.data);
        setFilteredCourses(response.data);
        setLoading(false); // Set loading to false when courses are loaded

      })
      .catch((error) => {
        console.error('Error fetching course data:', error);

      });
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      return (
        (selectedCategory === null || course.category === selectedCategory) &&
        (course.coursename?.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });

    setFilteredCourses(filtered);
  }, [selectedCategory, searchInput, courses]);

  return (
    <>
      <Customenavbar />
      <Coursefilter
        onSelectCategory={setSelectedCategory}
        onSearch={setSearchInput}
      />

      <div className='w-full  bg-[#f2f5eb] p-6 md:h-screen h-f'>
        <div className="md:flex mb-5 justify-center">
          <div className="md:w-1/2 bg-[#f2f5eb] h-12 md:mb-0 mb-4  md:pl-28">
            <h1 className='py-3 text-3xl'>All <span className='text-black'>Courses</span></h1>
          </div>
          <div className="md:w-1/2 bg-[#f2f5eb] h-12 md:mb-0 mb-4">
            <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </div>
        </div>
        <div className='md:ml-24'>
  <div className='md:flex flex-wrap bg-[#f2f5eb] justify-start '>
    {loading ? (
      // Display skeleton while loading
      Array(4).fill().map((_, index) => (
        <div key={index} className='md:w-1/4'>
        <div className=' drop-shadow-sm rounded md:mr-4 my-4 transition-transform transform bg-white hover:scale-105 hover:shadow-lg hover:bg-gray-100 md:w-96 md:h-4/4 '>
  <div className="p-4">
  <Lottie animationData={loadingani} className="w-1/6 " size={40}/>

    <div className="h-24">
      <Skeleton width={300} height={150} />

    </div>
    <h1 className='p-2 truncate font-semibold text-lg'>
      <Skeleton width={150} height={20} style={{ borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
    </h1>
    <div className='p-4 border border-b flex justify-between  w-[300px]'>
      <div className='flex items-center '>
        <Skeleton width={40} height={20} style={{ borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
      </div>
      <div className="flex items-center justify-between bg-[#ddfcef] px-2">
        <BiSolidOffer size={20} style={{ color: '#1A906B' }} />
        <span className='text-sm font-sans p-2'>
          <Skeleton width={60} height={20} style={{ borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
        </span>
      </div>
    </div>
    <div>
    <h1 className='p-2 truncate font-semibold text-lg'>
      <Skeleton width={280} height={20} style={{ borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
    </h1>
    </div>
  </div>
</div>

        </div> 

        
      ))
    ) : (
      filteredCourses.map((course) => (
        <Coursecardmain key={course.id} course={course} className='md:w-1/4' />
      ))
    )}
  </div>
</div>

        
      </div>
      <Footer/>
    </>
  );
}

export default Coursepage;
