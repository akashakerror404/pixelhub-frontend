import Adminnavbar from '../Adminnav/Adminnavbar'
import cardimage from '../../../static/photoshop.jpg';
import { useParams } from 'react-router-dom'; // Import useParams to capture the courseId
import axios from '../../../axios'
import React, { useState, useEffect } from 'react';

function Courseadmindetail() {
    const { courseId } = useParams(); // Capture the courseId from the URL
    const [courseDetails, setCourseDetails] = useState(null);
  
    useEffect(() => {
      // Fetch course details based on the courseId
      axios.get(`/courses/${courseId}/`).then((response) => {
        setCourseDetails(response.data);
        console.log(response.data)
      });
    }, [courseId]);
  
    if (!courseDetails) {
      // You can render a loading indicator here while waiting for the data to load
      return <div>Loading...</div>;
    }
  return (
    <div>
        <Adminnavbar/>
        <div className='p-4 bg-[#1F2A40]'>
            <div class="flex mb-4">
                <div class="w-1/2 bg-[#1F2A40] h-14">
                    <p className='md:text-3xl text-2xl pl-5 mt-2 text-white mb-4'>Course name : {courseDetails.coursename}</p>
                </div>
                {/* <div class="w-1/2 bg-[#1F2A40]h-14 flex items-center">
                    <button class="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group ml-auto">
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-24 group-hover:h-24"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative text-sm">Edit</span>
                    </button>

                </div> */}
            </div>
            

            <div class="flex ">
                <div class="w-full [#1F2A40] ">
                <div class="flex ">
                    <div class="w-full bg-[#1F2A40] h-12 mb-4">
                    <p className='md:text-3xl text-2xl pl-5 mt-2 text-white mb-4'>Vendorname : {courseDetails. vendorname}</p>

                    </div>
                </div>
                <div class="md:flex p-4">
                <div class="md:w-3/4 bg-[#1F2A40]">
                    <p className='md:text-2xl mb-4 text-white'> <span className='text-red-500'>Head Line :</span> {courseDetails.headline}</p>
                    <p className='md:text-2xl text-white'><span className='text-red-500'>Description :</span>{courseDetails.description} </p>

                </div>
            
                
                </div>

                <div class="flex p-4">
                    <div class="w-full bg-[#1F2A40] h-16">
                    <p className='md:text-2xl text-white'>Price : ₹ {courseDetails.price}</p>
                    <p className='md:text-2xl text-white'>Discount Price :{courseDetails.discount_percentage} %</p>


                    </div>
                </div>
                <div class="flex p-4">
                <div class="w-full bg-[#1F2A40] ">
                <p className='md:text-2xl mb-5 text-white'>About</p>
                <p className='md:text-2xl text-white'>{courseDetails.about}</p>


                </div>
                </div>



                    
                </div>
            </div>

        </div>

      
    </div>
  )
}

export default Courseadmindetail
