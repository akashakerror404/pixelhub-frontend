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
           
          </div>
          
        </div>
      </div>
      </>
      
        
    )
}

export default Herohome