import React, {useState, useEffect, useRef} from 'react';
import cardimage from '../../../static/photoshop.jpg';
import {BiSolidOffer} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios'
import { useSelector } from 'react-redux';
import { API_URL } from '../../Baseurl';

function Cousecardpendingcourse({courses}) {
    const navigate=useNavigate();
    const [socket, setSocket] = useState(null);

    const { isAuthenticated, userId } = useSelector((state) => state.user);
    console.log(userId)
    const vendorId=courses.vendor_id
    const message=(courses.coursename)
    console.log(vendorId)
    const roomName = `${vendorId}_${"admin"}`;
    console.log("room name", roomName)

  // const handlewebsocket=()=>{
    useEffect(() => {
      if (!socket) {
        const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/note-chat/${roomName}/`);
        newSocket.onopen = () => {
          console.log('WebSocket connection opened');
          setSocket(newSocket);
        };
      }
  
      return () => {
        // Close the WebSocket connection when the component unmounts
        if (socket) {
          socket.close();
        }
      };
    }, [socket, roomName]);
  
    const handlePublishClick = (courseId) => {

       axios.post(`/publish_course_admin/${courseId}/`)
          .then((response) => {
            navigate('/admin/fullcourses');
            console.log('Course published successfully');
          })
          .catch((error) => {
            console.error('Error publishing course:', error);
          });
      console.log('here')
      if (socket.readyState === WebSocket.OPEN) {
        const messageToSend = {
          message_content: `Course "${courses.coursename}" published`,
        };
        socket.send(JSON.stringify(messageToSend));
      } else {
        console.log('WebSocket is not yet open or has closed.');
      }
    };
   
  // }

    

   
    const handleShowVideosClick = (courseId) => {
      // Use the navigate function to redirect to the Videos component with the course ID
      navigate(`/admin/videosadmin/${courseId}`);
    };
    const handleImageClick = (courseId) => {
      // Handle the image click here and pass the courseId
      navigate(`/admin/coursefulldetails/${courseId}`);
    };

  

  return (
    <div>
          <div className='bg-white drop-shadow-sm rounded  md:mr-4 my-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 rounded-l-md md:w-96'>
      <h1 className='p-2 truncate font-semi'>{courses.coursename}</h1>
      {courses.coverphoto?<img src={`${API_URL}${courses.coverphoto}`} alt={courses.coursename} className='h-40 w-full object-cover'  onClick={() => handleImageClick(courses.id)} />:<p className='text-black-500'>""  </p>}

    {/* <img src={cardimage} alt="" className='h-40 w-full objacts-cover' onClick={()=>navigate('/admincoursedetail')} /> */}
    <div className='p-2 border border-b grid grid-flow-col mr-auto justify-between'>
      

     
    </div>
    <div class="grid grid-flow-col mr-auto  justify-between p-4" >

    <div>
          {courses.publishadmin ? (
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
    <button
            type='button'
            class='inline-block rounded bg-[#B3CCCF] px-6  pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#2d737a]  '
            onClick={() => handleShowVideosClick(courses.id)} // Pass the course ID
          >
            SHOW VIDEOS
          </button>

    </div>

    </div>
  </div>

      
    </div>
  )
}

export default Cousecardpendingcourse
