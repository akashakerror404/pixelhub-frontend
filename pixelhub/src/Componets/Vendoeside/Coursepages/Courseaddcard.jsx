import React from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Baseurl';

function Courseaddcard({ courses }) {
  const navigate=useNavigate();

    function handlePublishClick(courseId) {
        // Make an axios POST request to publish the course
        axios.post(`/publish_course_vendor/${courseId}/`)
          .then((response) => {
            navigate('/vendor/waitinglist');
            console.log('Course published successfully');
            // You can also trigger a re-fetch of courses or update the UI as needed
          })
          .catch((error) => {
            // Handle errors here
            console.error('Error publishing course:', error);
          });
      }
      const handleImageClick = (courseId) => {
        // Handle the image click here and pass the courseId
        navigate(`/vendor/coursefulldetails/${courseId}`);
      };
  
      
  return (
    <div className='bg-white drop-shadow-sm rounded md:mr-4 my-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 rounded-l-md md:w-96'>
      <h1 className='p-2 truncate font-semi'>{courses.coursename}</h1>
      {courses.coverphoto ? (
        <img
          src={`${API_URL}${courses.coverphoto}`}
          alt={courses.coursename}
          className='h-40 w-full object-cover'onClick={() => handleImageClick(courses.id)}
        />
      ) : (
        <p className='text-black-500'>" "</p>
      )}

      <div className='p-2 border border-b grid grid-flow-col mr-auto justify-between'>
        {/* Add content here */}
      </div>

      <div className='grid grid-flow-col mr-auto justify-between p-4'>
      <div>
          {courses.publishvendor ? (
            <button
              type='button'
              className='inline-block rounded bg-[#1A906B] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:outline-none focus:ring-0'
            >
              PUBLISHED
            </button>
          ) : (
            <button
              type='button'
              className='inline-block rounded bg-[#2d737a] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
              onClick={() => handlePublishClick(courses.id)}
            >
              Publish
            </button>
          )}
        </div>
        <div>
          <Link to={`/vendor/videos/${courses.id}`}>
            <button
              type='button'
              className='inline-block rounded bg-[#B3CCCF] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#2d737a] shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#B3CCCF] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#B3CCCF] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#B3CCCF] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
            >
              SHOW VIDEOS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Courseaddcard;
