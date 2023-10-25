import Vendornav from '../Vendornavbar/Vendornav'
import {useSelector, useDispatch} from 'react-redux';
import React, {useState, useEffect} from 'react';
import axios from '../../../axios'
import { MdOutlineHotelClass } from 'react-icons/md';

function Vendordash() {
    const {isAuthenticated, username, userId, role} = useSelector((state) => state.user);
    console.log(userId)
    const [Dashdata, setDashdata] = useState({});
    console.log(Dashdata)
 



    const WEEK = ["/SUN", "/MON", "/TUE", "/WED", "/THU", "/FRI", "/SAT"];

    // Moved the updateTime and zeroPadding functions inside the component
    const updateTime = () => {
        const now = new Date();
        document.getElementById("time").innerText =
            zeroPadding(now.getHours(), 2) + ":" +
            zeroPadding(now.getMinutes(), 2) + ":" +
            zeroPadding(now.getSeconds(), 2);
        document.getElementById("date").innerText =
            now.getFullYear() + "/" +
            zeroPadding(now.getMonth() + 1, 2) + "/" +
            zeroPadding(now.getDate(), 2) + " " +
            WEEK[now.getDay()];
    };
    useEffect(() => {
       
        axios.get(`/vendorstudentcount/${userId}/`).then((response) => {
            setDashdata(response.data);
            console.log(response.data)
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });

        updateTime();
        // Set up a timer to update the time
        const timerId = setInterval(updateTime, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timerId);

    }, []);
    const zeroPadding = (num, digit) => {
        return String(num).padStart(digit, '0');
    };
   

    return (
        <>
            <Vendornav/>
            
            <div className='w-full bg-[#1F2A40]'>
                <div className='md:p-9 p-4  w-full bg-[#1F2A40]'>
                    <div class="md:flex rounded-2xl ">
                        <div class="md:w-3/4 w-full bg-[#141B2D] h-40 rounded-l-md">
                            <div class="text-white text-start md:md:pl-28 p pl-4 md:mt-9 mt-4 mb-2">
                                <p className='md:text-3xl text-2xl pb-2'>Hello Teacher</p>
                                <p className='md:text-2xl text-1xl bg-[#70D8BD] bg-clip-text text-transparent'>Welcome to Dashboard</p>
                                <p className='md:text-2xl text-1xl pb-2'>Congratulations, You have some good news</p>
                                <p className='md:hidden md:text-2xl text-1xl'>september 18</p>

                            </div>
                        </div>

                        <div className=" md:flex md:w-1/4 bg-[#141B2D] md:h-40 h-20 items-center justify-center content-center rounded-r-md">
                            <div className="text-white text-center md:w-60 h-14 items-center justify-center rounded-full border border-white">
                              
                                <p id="time" className='md:text-2xl text-1xl text-red-500'></p>

                            <span id="date"></span>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="md:flex gap-4 md:p-9 p-4">
                    <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2 ">
                        <i className="fa fa-user fa-2x text-white" aria-hidden="true"></i>
                        <p className="text-white">Toatal Course {
                            Dashdata.course_count
                        }</p>
                    </div>
                    <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2">
                        <i className="fa fa-book fa-2x text-white mb-5" aria-hidden="true"></i>
                        <p className="text-white">Toatl Studnets {
                            Dashdata.payment_count
                        }</p>
                    </div>
                    <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2">

                        {/* <i className="fa fa-user fa-2x text-white" aria-hidden="true"></i> */}
                        <MdOutlineHotelClass  size={30} color="white"/>
                        <p className="text-white">Course Pending {Dashdata.pendingcount}</p>
                    </div>
                    <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2">
                        <i className="fa fa-user fa-2x text-white" aria-hidden="true"></i>
                        <p className="text-white">Total Revenie {
                            Dashdata.total_amount
                        }</p>
                    </div>
                </div>

                <div class="flex  ">
                    <div className="w-full bg-[#1F2A40] h-12">
                        <p className='md:text-3xl text-2xl  md:pl-28 pl-6 text-white'>Recent transcation</p>
                    </div>

                </div>
                <div className='md:p-8 p-2'>
                    <div class="relative overflow-x-auto rounded-md">
                        <table class="w-full text-sm text-left text-white text-white">
                            <thead class="text-xs text-white uppercase  bg-[#141B2D] text-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        User name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Cource
                                    </th>
                                    {/* <th scope="col" class="px-6 py-3">
                                        Category
                                    </th> */}
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                        {Dashdata.transaction_data && Dashdata.transaction_data.map((transaction, index) => (
                            <tr key={index} className="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">
                                {transaction.user_name}
                            </th>
                            <td className="px-6 py-4">
                                {transaction.course}
                            </td>
                            <td className="px-6 py-4">
                                ₹{transaction.price}
                            </td>
                            </tr>
                        ))}
                        </tbody>


                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Vendordash
