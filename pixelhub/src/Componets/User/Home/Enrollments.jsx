// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import Customenavbar from '../Navbar/Customenavbar';
import Enrollmentprogresscard from './Enrollmentprogresscard';

function Enrollments() {
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend and populate the courses state
    axios.get(`/user_enrollments/${userId}/`)
      .then((response) => {
        setCourses(response.data.courses); // Assuming the courses are in the 'courses' property of the response
        console.log(response.data.courses)
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, [userId]);

  return (
    <>
      <Customenavbar />
      <div className='md:p-6 p-2 bg-[#f2f5eb]'>
      <div className="flex ">
        <div className="w-full   bg-[#f2f5eb]  ">
          <h1 className="py-3 text-3xl text-black pl-8">
            My <span className="text-black">Enrollments</span>
          </h1>
        </div>
      </div>

      <div className="flex mb-4  bg-[#f2f5eb] ">
        <div className="md:flex w-full md:gap-8  bg-[#f2f5eb] h-screen p-6">
          {courses.map((course) => (
          
            <Enrollmentprogresscard key={course.id} course={course} navigate={navigate} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default Enrollments;
