import React from 'react'
import Customenavbar from '../Navbar/Customenavbar'
import cardimage from '../../../static/photoshop.jpg';
import { useParams,Link } from 'react-router-dom';
// import Axios from 'axios';
import { useEffect, useState } from 'react';
import axios from '../../../axios'
import { API_URL } from '../../Baseurl';
import QueryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import Reviews from './Reviews/Reviews';

function Coursedeatils() {
    const { courseId } = useParams();
    const { isAuthenticated, username,userId, role } = useSelector((state) => state.user);
    console.log("user id",userId)
    console.log(courseId)
    const [courseDetails, setCourseDetails] = useState({});
    const [showFullContent, setShowFullContent] = useState(false);
    const [videoCount, setVideoCount] = useState(0);
    console.log("videocount",videoCount)

    const location =useLocation();
    const discountamount = courseDetails.price / courseDetails.discount_percentage;
    const totalamount = Math.round(courseDetails.price - discountamount);


    
    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      // const query = new URLSearchParams(window.location.search);
      const values=QueryString.parse(location.search);

  
      if (values.success) {
        console.log("Order placed! You will receive an email confirmation.");
      }
  
      if (values.canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);

    useEffect(() => {

        axios.get(`/courses/${courseId}/`)  // Replace 'courseSlug' with the actual slug of the course
          .then((response) => {
            setCourseDetails(response.data);
            setVideoCount(response.data.video_count); // Set the video count in state

            console.log(response.data)
            // Setloading(false)
          })
          .catch((error) => {
            console.error('Error fetching course details:', error);
          });
    }, [courseId]);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
      };
    

  return (
    <>
        <Customenavbar/>
      

        <div class="md:flex  md:p-6 w">
            <div class="md:w-3/4 w-full md:p-6 p-2">
              <div class="relative flex flex-col min-w-0 break-words bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] bg-clip-border">
              <div class="flex-auto p-4">
                <div class="max-w-full px-3 lg:w-1/1 lg:flex-none">
                    <div class="flex flex-col h-full">
                    <p class="pt-2 mb-1 text-2xl font-semibold">{courseDetails.coursename}</p>

                        <p class="pt-2 mb-1 font-semibold mb-2">{courseDetails.headline}</p>
                        <p class="pt-2 mb-1 font-semibold mb-2">AUTHOUR :  {courseDetails.vendorname}</p>

                        <p class="mb-12">{courseDetails.description}</p>
                    </div>
                    <div class="flex flex-col h-full">
                        <p class="pt-2 mb-1 font-semibold">About</p>
                        <div class="content mb-6">
                            <p class="mb-3 line-clamp-3 md:line-clamp-none">{courseDetails.about}</p>
                            <div class="hidden md:block" id="fullContent">
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>


            <div class="md:w-1/4 w-full b md:p-6 p-3 ">
                    <div class="max-w-sm bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg" src={`${API_URL}${courseDetails.coverphoto}`} alt=""/>
                        </a>
                        <div class="p-4">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{courseDetails.coursename}</h5>
                            </a>
                            <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">₹{courseDetails.price}</p>
                            <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">Discount :{courseDetails.discount_percentage} %</p>

                            <p class="mb-2 text-sm text-gray-700 dark:text-gray-400">(Include GST)</p>
                            <p class="mb-2 text-sm text-gray-700 dark:text-gray-400"> Lectures : <span className='text-red-500'> {videoCount} Lessons</span></p>
                            <p class="mb-2 text-sm text-gray-700 dark:text-gray-400">  <span className='text-red-500'>Life time access</span></p>

                           
                            <div className='justify-center'>
                            {userId ? (
                        <form action={`${API_URL}/create-checkout-session`} method="POST">
                          <input type="hidden" name="courseId" value={courseId} />
                          <input type="hidden" name="userId" value={userId} />
                          <button
                            type="submit"
                            className="w-full inline-block rounded bg-[#2d737a] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            BUY NOW  ₹  {totalamount}
                          </button>
                        </form>
                      ) : (
                        <Link to="/signin"><li className='group relative px-3 py-2 text-sm font-medium text-back '>
                        Please sign in to make a purchase
                        <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li></Link>
                    
                        
                        
                      )}

                            </div>
                      </div>
                    </div>
            </div>
        </div>
        <Reviews id={courseId} />

    </>
  )
}

export default Coursedeatils
