import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Baseurl';

function Blogcard({ blog }) {
    const handleViewBlog = () => {
        // Navigate to the 'blogdetails' route with the blog id as a URL parameter
        navigate(`/blogdetails/${blog.id}`);
      };
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden  bg-[#2a98dd44] shadow-md h-full">
        <img className="w-full h-60 " src={`${API_URL}${blog.image}`} alt={blog.headline}  />
        
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{blog.headline}</div>
          <p className='mb-2 text-black-500'>{new Date(blog.date_and_time).toLocaleDateString()}</p>

          <p className="text-black-700 text-base">{blog.content.slice(0, 100)}{blog.content.length > 300 ? '...' : ''}</p>
        </div>
        <div class=" items-center md:ml-20 ml-16 mb-4">
        <button
        className="relative inline-flex w-52 h-4 items-center px-12 py-3 overflow-hidden text-lg font-medium text-whit-600 border-2 border-[#90c6e8] rounded-md hover:text-white group hover:bg-gray-50"
        onClick={handleViewBlog}
        >
        <span className="absolute left-0 block w-full h-0 transition-all bg-[#90c6e8] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </span>
        <span className="relative text-sm">View full blog</span>
      </button>
            
        </div>
      </div>
    </div>
  );
}

export default Blogcard;
