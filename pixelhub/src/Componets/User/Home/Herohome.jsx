import React, { useState, useEffect } from 'react';
import logo from '../../../static/cam.png';
import Coursecards from './Coursecards';

import Communitydiv from './Communitydiv';
import Footer from './Footer';
import Customenavbar from '../Navbar/Customenavbar';
import Search from './Search';
import earth from '../../../Animations/earth.json';
import Lottie from 'lottie-react'
import Permission from '../../../Permission';
import Skeleton from 'react-loading-skeleton'

function Herohome() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);


    return (
        <>
        <Customenavbar/>
        <Permission/>

        <div className='w-full bg-white py-24'>
        <div className='max-w-[1380px] m-auto grid grid-cols-1 md:grid-cols-2'>
        {/* <Lottie animationData={earth} /> */}

       {imageLoaded ? (
              <img src={logo} alt="" className="md:order-2" />
            ) : (
              <div className="md:order-2 flex items-center justify-center">
                <div className="w-36 h-36 bg-gray-300  p-4">
                
                </div>
              </div>
            )}

          
          <div className='flex flex-col justify-start gap-4 pl-3.5 md:order-1'>
            <p className='py-2 text-2xl text-[#2d737a] md:font-medium text-base'>START TO SUCCESS</p>
            <h1 className='md:leading-[72px] py-2 md:text-6xl text-3xl font-semibold'>Access To <span className='text-[#2d737a]'>5000+</span> Courses
              from <span className='text-[#2d737a]'>300</span> Instructors & Institutions
            </h1>
            <p className='py-2 text-lg text-gray-600'>Various versions have evolved over the years, sometimes by accident.</p>
            {/* <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} /> */}

            {/* <div className="relative flex md:w-full w-5/6 h-12 rounded-lg focus-within:shadow-lg bg-[#f2f5eb] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2d737a">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-10 bg-[#f2f5eb]" type="text" id="search" placeholder="Search something.."/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2d737a" className="h-8 w-8 absolute right-2 top-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div> */}
          </div>
          
        </div>
      </div>
      </>
      
        
    )
}

export default Herohome