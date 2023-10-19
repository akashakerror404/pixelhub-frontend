import Adminnavbar from '../Adminnav/Adminnavbar'
import React, { useState, useEffect } from 'react';
import axios from '../../../axios'

function Dashboard() {
    const [Dashdata, setDashdata] = useState({});


    useEffect(() => {
        // Fetch data from the backend using the userId
        axios.get('/admindash')
          .then((response) => {
            setDashdata(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);  // Include userId in the dependency array
  return (
    <>
            <Adminnavbar/>

    <div className='w-full bg-[#1F2A40]'>
                    <div className='md:p-9 p-4  w-full bg-[#1F2A40]'>
                        <div class="flex rounded-2xl ">
                                <div class="md:w-3/4 w-full bg-[#141B2D] h-40 rounded-l-md">
                                    <div class="text-white text-start md:md:pl-28 p pl-4 md:mt-9 mt-4 mb-2">
                                        <p className='md:text-3xl text-2xl pb-2'>Hello Admin</p>
                                        <p className='md:text-2xl text-1xl bg-[#70D8BD] bg-clip-text text-transparent'>Welcome to Dashboard</p>
                                        <p  className='md:text-2xl text-1xl pb-2'>Congratulations, You have some good news</p>
                                        <p className='md:hidden md:text-2xl text-1xl'>september 18</p>

                                    </div>
                                </div>

                            <div class="hidden md:flex w-1/4 bg-[#141B2D] h-40 md:pl-20 rounded-r-md">
                                <div class="text-white text-center md:w-60 h-10 md:mt-14 mt-16 mb-2 rounded-full border border-white">
                                    <p className='md:text-2xl text-1xl'>september 18</p>
                                </div>

                            </div>

                        </div>
                        </div>


                        <div className="md:flex gap-4 md:p-9 p-4">
                                <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2 ">
                                    <i className="fa fa-user fa-2x text-white" aria-hidden="true"></i>
                                    <p className="text-white">Toatal Users 115</p>
                                </div>
                                <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2">
                                    <i className="fa fa-book fa-2x text-white mb-5" aria-hidden="true"></i>
                                    <p className="text-white">Toatl Vendors 2</p>
                                </div>
                                <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2">
                                    <i className="fa fa-user fa-2x text-white" aria-hidden="true"></i>
                                    <p className="text-white">Course completed 3</p>
                                </div>
                                <div className="md:w-1/4 bg-[#141B2D] h-48 flex flex-col justify-center items-center rounded-md md:mb-0 mb-2">
                                    <i className="fa fa-user fa-2x text-white" aria-hidden="true"></i>
                                    <p className="text-white">Total Revenie</p>
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
                                        <tr class="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">
                                                Arun payyadimethal
                                            </th>
                                            <td class="px-6 py-4">
                                                Photoshop
                                            </td>
                                            {/* <td class="px-6 py-4">
                                                Laptop
                                            </td> */}
                                            <td class="px-6 py-4">
                                                $2999
                                            </td>
                                        </tr>
                                        <tr class="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">
                                                Rahulravi
                                            </th>
                                            <td class="px-6 py-4">
                                                photography
                                            </td>
                                            {/* <td class="px-6 py-4">
                                                Laptop PC
                                            </td> */}
                                            <td class="px-6 py-4">
                                                $1999
                                            </td>
                                        </tr>
                                        <tr class="bg-[#141B2D] dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">
                                                Juvin
                                            </th>
                                            <td class="px-6 py-4">
                                                Videography
                                            </td>
                                            {/* <td class="px-6 py-4">
                                                Accessories
                                            </td> */}
                                            <td class="px-6 py-4">
                                                $99
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                   
                        









      
    </div>
    </>
  )
}

export default Dashboard
