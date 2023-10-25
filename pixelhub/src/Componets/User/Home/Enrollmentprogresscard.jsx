import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../Baseurl';

function Enrollmentprogresscard({ course }) {
  const vendorId=course.vendor_id
  const vendorname=course.vendorname
  const courseid =course.id
  const coursename =course.coursename
  console.log("course deatils",courseid)
  console.log("course coursename",coursename)



  const navigate = useNavigate();

  const handleChatClick = () => {
    // Navigate to the "/userchat" route and pass the vendorId as a parameter
    // navigate(`/userchat/${vendorId}`);
    navigate(`/userchat/?vendorid=${vendorId}&vendorname=${vendorname}`);

  };

  console.log(vendorId)
  


  return (
        <div className="bg-white md:h-1/2 p-6 mb-4 md:w-1/4 ">
          <h1 className="p-2 truncate font-semi">{course.coursename}</h1>
          <img
            src={`${API_URL}${course.coverphoto}`}
            alt=""
            className="h-40 w-full object-cover"
            onClick={() => navigate(`/video?courseid=${courseid}&coursename=${coursename}`)}
          />
          <div className="border border-b grid grid-flow-col mr-auto justify-between">
            {/* Add your progress indicators or information here */}
          </div>
          <div className="p-4">
            <div className="group flex rounded-full justify-center bg-[#00A9B7] h-8 mb-4 p-2 hover-bg-green-500 transition-colors duration-300">
              <button className="block text-white text-sm font-sans uppercase pr-4 " onClick={handleChatClick}>
                CHAT
              </button>
              <div className="bg-blue-light shadow-border">
                <div className="w-4">
                <svg class="fill-current text-white animate-shake" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z"/></svg>
                </div>
              </div>
            </div>
            <div className="group flex rounded-full justify-center bg-[#5ed62f] h-8 mb-4 p-2 hover-bg-green-500 transition-colors duration-300">
              <button className="block text-white text-sm font-sans uppercase pr-4 " onClick={() => navigate(`/video?courseid=${courseid}&coursename=${coursename}`)}>
                CONTINUE
              </button>
              
            </div>
           
          </div>
        </div>
  );
}

export default Enrollmentprogresscard;
