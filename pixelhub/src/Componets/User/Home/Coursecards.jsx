import cardimage from '../../../static/photoshop.jpg';
import Card from './Card';
import Slider from "react-slick";
import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import Skeleton from 'react-loading-skeleton'; // Import the skeleton component

function Coursecards() {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/courses_all')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, []);
console.log(courses)

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
  };
  return (
    <div className='w-full bg-[#f2f5eb] py-24'>
    <div className='md:max-w-[1180px] m-auto  max-w-[300px]'>
      <h1 className='py-3 text-3xl'>Most Popular <span className='text-black'>Courses</span></h1>
      <p>Various versions have evolved over the years sometimes by accident</p>
      <Slider {...settings}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course.id} course={course} />
          ))
        ) : (
          // Use skeleton loading when data is being fetched
          <>
          <div className='flex justify-evenly gap-3'>
            <div className="skeleton-card horizontal-skeleton">
              <Skeleton width={300} height={250} />
            </div>
            <div className="skeleton-card horizontal-skeleton">
              <Skeleton width={300} height={250} />
            </div>
            <div className="skeleton-card horizontal-skeleton">
              <Skeleton width={300} height={250} />
            </div>
            <div className="skeleton-card horizontal-skeleton">
              <Skeleton width={300} height={250} />
            </div>
            </div>
          </>
        )}
      </Slider>
    </div>
  </div>
  );
}

export default Coursecards;
