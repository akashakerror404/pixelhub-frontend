import React, { useState,useEffect } from 'react'
// import Adminnavbar from '../Adminnav/Adminnavbar'
import Courseaddcard from './Courseaddcard'
import { useNavigate,Link  } from 'react-router-dom';
// import Axios from 'axios';
import axios from '../../../axios'
import Vendornav from '../Vendornavbar/Vendornav';
import { useSelector  } from 'react-redux';

function Waitingcourse() {
    const navigate=useNavigate();
    const { isAuthenticated, username,userId, role } = useSelector((state) => state.user);
  
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      // Fetch courses from the backend and populate the courses state
      axios.get(`/waiting_vendor_courses/${userId}/`)

      // axios.get('/waiting_vendor_courses', {
      //   params: {
      //     userId: userId, // Pass the userId as a query parameter
      //   },
      // })
        .then((response) => {
          setCourses(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching courses:', error);
        });
    }, [userId]); // Include userId in the dependency array to trigger the effect when it changes
  return (
    <div>
         <div >
      <Vendornav/>
      <div className='md:p-9 p-3 bg-[#1F2A40] h-screen'>
            <div class="flex ">
            <div class="w-full bg-[#1F2A40] h-12 mb-8 md:pl-16">

            <p className='md:text-3xl text-2xl pl-2 mt-2 text-white '>Your pending Courses</p>
            <p className='text-white pl-5 mt-2'>Waiting for admin aprovel</p>


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
      
    </div>
  )
}

export default Waitingcourse
