import React from 'react'
import communityicon from '../../../static/community.png';
import { useNavigate } from 'react-router-dom';

function Communitydiv() {
  const navigate = useNavigate();

  return (

      <div className="flex flex-col-reverse  md:flex-row shadow bg-[#e6faec] ">
<div className="w-full md:w-1/2 bg-white-400 h-50 md:p-8  pr-1.5 pl-1.5 md:h-96">
    
        <h1 className="md:text-2xl text-black mb-4 pt-4 drop-shadow-lg"  style={{ fontFamily: 'Poppins, sans-serif' }}>
        Platform for Connect and 
        build your career
        </h1>
        <p className="hidden md:flex md:text-black text-sm mb-4 pt-2 drop-shadow-lg leading-relaxed">
  "Our platform facilitates direct communication between users and tutors, providing you with a seamless opportunity to collaborate, connect, and showcase your projects. By engaging with startups and top companies in the fields of photography and media, you can not only refine your skills but also unlock a world of exciting opportunities. Join our community and leverage our platform to propel your career in photography and media to new heights. Whether you're a passionate beginner or an experienced professional, our platform is designed to empower and support your journey towards success."
</p>


       
<div>
    <button type="button" className="inline-block rounded bg-[#2d737a] px-6 mb-4  pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" onClick={()=>navigate('/blogs')} >EXPOLRE</button>
    </div>

    </div>
  <div class="w-1/2 w-full md:w-1/2 bg-white-400 h-50 md:p-8  pr-1.5 pl-1.5 md:h-96">
  <div className="h-full flex items-center justify-center">
            <img src={communityicon} alt="Your Image" className="max-h-96 max-w-full " />
        </div>
  </div>
</div>
 
  )
}

export default Communitydiv
