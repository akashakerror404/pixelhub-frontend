import React from 'react'
import cardimage from '../../../static/photoshop.jpg';
import { API_URL } from '../../Baseurl';
import {useNavigate} from 'react-router-dom';

function Card({ course }) {
  const navigate = useNavigate();

  const truncatedDescription = course.description.slice(0, 100);

  return (
    <div className='bg-white drop-shadow-sm overflow-hidden rounded-2xl md:mr-4 my-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 h-80 '>
      <img src={`${API_URL}${course.coverphoto}`}alt="" className='h-40 w-full objacts-cover' onClick={
                            () => navigate(`/coursedetail/${
                                course.id
                            }`)
                    } />
      <div className='p-5 border border-b'>
       <h1 className='py-2 truncate font-bold'>{course.coursename}</h1>
       <p>
       <p className=''>{truncatedDescription}</p>
       </p>
       {/* <p>Discover the Art of 
            Photography with Our 
            Diverse Range of Courses. 
            </p> */}
      </div>
    </div>

  )
}

export default Card
