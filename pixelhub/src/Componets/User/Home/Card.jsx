import React from 'react'
import cardimage from '../../../static/photoshop.jpg';

function Card() {
  return (
    <div className='bg-white drop-shadow-sm overflow-hidden rounded-2xl md:mr-4 my-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100'>
      <img src={cardimage} alt="" className='h-40 w-full objacts-cover' />
      <div className='p-5 border border-b'>
       <h1 className='py-2 truncate font-bold'>Photoshop</h1>
       <p>Discover the Art of 
            Photography with Our 
            Diverse Range of Courses. 
            </p>
      </div>
    </div>

  )
}

export default Card
