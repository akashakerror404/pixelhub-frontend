import React from 'react'
import cardimage from '../../../static/photoshop.jpg';
import {BiSolidOffer} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Baseurl';

function Courseaddcard({ courses }) {
    const navigate=useNavigate();
    const handleShowVideosClick = (courseId) => {
      // Use the navigate function to redirect to the Videos component with the course ID
      navigate(`/admin/videosadmin/${courseId}`);
    };
    const handleImageClick = (courseId) => {
      // Handle the image click here and pass the courseId
      navigate(`/admin/coursefulldetails/${courseId}`);
    };

  return (

    <div className='bg-white drop-shadow-sm rounded md:mr-4 my-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 md:w-80 md:h-2/4'>
    <h1 className='p-2 truncate font-semi'>{courses.coursename}</h1>
      {courses.coverphoto?<img src={`${API_URL}${courses.coverphoto}`} alt={courses.coursename} className='h-40 w-full object-cover'  onClick={() => handleImageClick(courses.id)} // Handle image click
 />:<p className='text-black-500'>""  </p>}

    {/* <img src={cardimage} alt="" className='h-40 w-full objacts-cover' onClick={()=>navigate('/admincoursedetail')} /> */}
    <div className='p-2 border border-b grid grid-flow-col mr-auto justify-between'>
        <div>
        <h1 className='p-1  truncate font-semi'> ₹ : {courses.price}</h1>
        
        
        </div>
        <div class="flex items-center justify-between bg-[#ddfcef] px-2">
            <BiSolidOffer size={20} style={{color: '#1A906B'}} />
        <span className='text-sm font-sans p-2'>Discount 40%</span>
    </div>


     
    </div>
    <div class=" p-4" >

  
    <div>
    <button
            type='button'
            class='inline-block rounded bg-[#B3CCCF] w-full  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#2d737a] '
            onClick={() => handleShowVideosClick(courses.id)} // Pass the course ID
          >
            SHOW VIDEOS
          </button>

    </div>

    </div>
  </div>

  )
}

export default Courseaddcard
