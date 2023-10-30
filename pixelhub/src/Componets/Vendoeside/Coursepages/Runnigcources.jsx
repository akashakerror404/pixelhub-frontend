import React, { useState,useEffect } from 'react'
import Courseaddcard from './Courseaddcard'
import { useNavigate,Link  } from 'react-router-dom';
import axios from '../../../axios'
import { useSelector  } from 'react-redux';
import Vendornav from '../Vendornavbar/Vendornav';


function Runnigcources() {
    const navigate=useNavigate();
    const { isAuthenticated, username,userId, role } = useSelector((state) => state.user);
    
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      // Fetch courses from the backend and populate the courses state
      axios.get(`/running_vendor_courses/${userId}/`)

   
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
        <Vendornav/>
    <div className='md:h-screen h-full bg-[#1F2A40] '>
 <div className='md:p-9 p-3 bg-[#1F2A40] md:h-screen h-full'>
       <div class="flex ">
       <div class="w-full bg-[#1F2A40] ">
       <p className='md:text-3xl text-2xl md:pl-20 mt-2 text-white '>Your Now Running Courses</p>
       <p className='text-white md:pl-20 mt-2'>Now Running Courses</p>

       </div>
       </div>

  
       <div className='md:flex md:max-w-[1300px] m-auto  max-w-[300px]'>
       {courses.map((courses)=>(
           <Courseaddcard courses={courses}/>

       ))}
     
       
       </div>







</div>

</div>
 
</div>
  )
}

export default Runnigcources
