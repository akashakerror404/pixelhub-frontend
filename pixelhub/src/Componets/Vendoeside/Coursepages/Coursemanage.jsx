import React, { useState,useEffect } from 'react'
// import Adminnavbar from '../Adminnav/Adminnavbar'
import Courseaddcard from './Courseaddcard'
import { useNavigate,Link  } from 'react-router-dom';
// import Axios from 'axios';
import axios from '../../../axios'
import Vendornav from '../Vendornavbar/Vendornav';
import { useSelector  } from 'react-redux';

function Coursemanage() {
  const navigate=useNavigate();
  const { isAuthenticated, username,userId, role } = useSelector((state) => state.user);

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the backend and populate the courses state
    axios.get(`/courses_list_vendor/${userId}/`)

  
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, [userId]); // Include userId in the dependency array to trigger the effect when it changes



  return (
    <div >
      {/* <Adminnavbar/> */}
      <Vendornav/>
      <div className='md:p-9 p-3 bg-[#1F2A40] h-screen'>
            <div class="flex ">
            <div class="w-full bg-[#1F2A40] h-12">
            <p className='md:text-3xl text-2xl md:pl-20 mt-2 text-white '>On Going Classes</p>
            </div>
            </div>

            <div class="flex mb-4">
                <div class="w-1/2 bg-[#1F2A40] h-12">
                {/* <div className="relative flex md:w-full w-7/3 h-12 rounded-lg focus-within:shadow-lg bg-[#f2f5eb] overflow-hidden">
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
                <div class="w-1/2 bg-[#1F2A40] relative">
                    <div class="">
                    <Link to="/vendor/addcourse">
                    <button className="absolute bottom-0 right-0 inline-block text-lg group">
                        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative">Add Course +</span>
                        </span>
                        <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                    </button>
                    </Link>
                    </div>
                </div>

            </div>
            <div className='md:flex md:max-w-[1300px] m-auto max-w-[300px]'>
          {courses.length === 0 ? (
            <div className="text-center text-red-500 mt-56 md:pl-[550px] ">No ongoing class !!!

            
            </div>
          ) : (
            courses.map((course) => (
              <Courseaddcard courses={course} key={course.id} />
            ))
          )}
        </div>







    </div>

    </div>
  )
}

export default Coursemanage
