import React, { useState,useEffect } from 'react'
import Adminnavbar from '../Adminnav/Adminnavbar'
import Courseaddcard from './Courseaddcard'
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import axios from '../../../axios'
import Cousecardpendingcourse from './Cousecardpendingcourse';

function Pendingcourses() {
    const navigate=useNavigate();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      // Fetch courses from the backend and populate the courses state
      axios.get('/pending_courses_list') // Replace with your API endpoint
        .then((response) => {
          setCourses(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching courses:', error);
        });
    }, []);


  return (
    <div>
        <Adminnavbar/>
         <div className='md:p-9 p-3 bg-[#1F2A40] h-screen'>
            <div class="flex ">
            <div class="w-full bg-[#1F2A40] h-12">
            <p className='md:text-3xl text-2xl pl-5 mt-2 text-white '>Avilabile Courses</p>
            </div>
            </div>

            <div class="flex mb-4">
                <div class="w-1/2 bg-[#1F2A40] h-12">
              
                </div>
                

            </div>
            <div className='md:flex md:max-w-[1300px] m-auto  max-w-[300px]'>
            {courses.map((courses)=>(
                // <Courseaddcard courses={courses}/>
                <Cousecardpendingcourse courses={courses}/>

            ))}
          
            
            </div>







    </div>

    </div>
      
  )
}

export default Pendingcourses
