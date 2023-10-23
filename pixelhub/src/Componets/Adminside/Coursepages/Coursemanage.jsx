import React, { useState,useEffect } from 'react'
import Adminnavbar from '../Adminnav/Adminnavbar'
import Courseaddcard from './Courseaddcard'
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import axios from '../../../axios'
function Coursemanage() {
  const navigate=useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch courses from the backend and populate the courses state
    axios.get('/courses_list') // Replace with your API endpoint
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);


  return (
    <div >
      <Adminnavbar/>
      <div className='md:p-9 p-3 bg-[#1F2A40] h-screen'>
            <div class="flex ">
            <div class="w-full bg-[#1F2A40] h-12 md:pl-9 mb-4">
            <p className='md:text-3xl text-2xl md:pl-5 mt-2 text-white '>Avilabile Courses admin page</p>
            </div>
            </div>

            <div className='md:flex md:flex-wrap bg-[#1F2A40] md:pl-20 '>
          {courses.map((courses) => (
            <Courseaddcard courses={courses} className='md:w-1/4' />
          ))}
        </div>

           
    







    </div>

    </div>
  )
}

export default Coursemanage
