import React from 'react'
import cardimage from '../../../static/photoshop.jpg';
import {BiSolidOffer} from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';
import { API_URL } from '../../Baseurl';

function Coursecardmain({course}) {
    const navigate = useNavigate();

    return (
        <div className='bg-white drop-shadow-sm rounded md:mr-4 my-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100 md:w-80 md:h-4/4'>
            <h1 className='p-2 truncate font-semi'>
                {
                course.coursename
            }</h1>
            {
            course.coverphoto ? <img src={
                    `${API_URL}${
                        course.coverphoto
                    }`
                }
                alt={
                    course.coursename
                }
                className='h-40 w-full object-cover'/> : <p className='text-black-500'>""
            </p>
        }
            <div className='p-4 border border-b grid grid-flow-col mr-auto justify-between'>
                <div>
                    <h1 className='p-1 truncate font-semi'>₹{
                        course.price
                    }</h1>

                </div>
                <div className="flex items-center justify-between bg-[#ddfcef] px-2">
                    <BiSolidOffer size={20}
                        style={
                            {color: '#1A906B'}
                        }/>
                    <span className='text-sm font-sans p-2'>
                        {
                        `Discount ${
                            course.discount_percentage
                        }%`
                    }</span>
                </div>
            </div>

            <div className="p-4">
                <div className='mt-4'> 

                    <div className='justify-center'
                        onClick={
                            () => navigate(`/coursedetail/${
                                course.id
                            }`)
                    }>
                        <button type="button" class=" w-full inline-block rounded bg-[#2d737a] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">EXPLORE</button>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default Coursecardmain
