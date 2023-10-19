import React from 'react'
import Adminnavbar from '../Adminnav/Adminnavbar'
import cardimage from '../../../static/photoshop.jpg';

function Courseadmindetail() {
  return (
    <div>
        {/* <Adminnavbar/> */}
        <div className='p-4 bg-[#1F2A40]'>
            <div class="flex mb-4">
                <div class="w-1/2 bg-[#1F2A40] h-14">
                    <p className='md:text-3xl text-2xl pl-5 mt-2 text-white mb-4'>Course</p>
                </div>
                <div class="w-1/2 bg-[#1F2A40]h-14 flex items-center">
                    <button class="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group ml-auto">
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-24 group-hover:h-24"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative text-sm">Edit</span>
                    </button>

                </div>
            </div>
            <div class="flex ">
                <div class="w-full [#1F2A40] ">
                <div class="flex ">
                    <div class="w-full bg-[#1F2A40] h-12 mb-4">
                    <p className='md:text-3xl text-2xl pl-5 mt-2 text-white mb-4'>Retouching</p>

                    </div>
                </div>
                <div class="md:flex p-4">
                <div class="md:w-3/4 bg-[#1F2A40]">
                    <p className='md:text-2xl mb-4 text-white'> <span className='text-red-500'>Head Line :</span> Adobe Photoshop CS6 – Essentials Training</p>
                    <p className='md:text-2xl text-white'><span className='text-red-500'>Description :</span>This Adobe Photoshop Essentials course will teach you Photoshop Retouching as well as Photoshop for graphic design. course will teach you Photoshop Retouching </p>

                </div>
                <div class="md:w-1/4 bg-[#1F2A40]">
                <img src={cardimage} alt="" className='h-40 w-full objacts-cover' onClick={()=>navigate('/admincoursedetail')} />

                </div>
                
                </div>

                <div class="flex p-4">
                    <div class="w-full bg-[#1F2A40] h-16">
                    <p className='md:text-2xl text-white'>Price : $ 4500</p>
                    <p className='md:text-2xl text-white'>Discount Price : $ 4500</p>


                    </div>
                </div>
                <div class="flex p-4">
                <div class="w-full bg-[#1F2A40] ">
                <p className='md:text-2xl mb-5 text-white'>About</p>
                <p className='md:text-2xl text-white'>"Unlock the power of Photoshop with our beginner-friendly course. Whether you're a complete novice or looking to enhance your skills, our step-by-step lessons will equip you with the knowledge to use Photoshop professionally in Graphic Design and Retouching. No prior experience required! Start building your portfolio and discover the 'secret sauce' for image enhancement and object removal. Join our satisfied students like David and jumpstart your Photoshop journey today!"</p>


                </div>
                </div>



                    
                </div>
            </div>

        </div>

      
    </div>
  )
}

export default Courseadmindetail
