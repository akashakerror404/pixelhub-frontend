import Customenavbar from '../Navbar/Customenavbar'
import Bloghero from './Bloghero'
import Blogcard from './Blogcard'
import { useSelector ,useDispatch } from 'react-redux';
import axios from '../../../axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Blogpage() {
    const { isAuthenticated, username,userId, role } = useSelector((state) => state.user);
    const [userblog, setuserblog] = useState(false);
    const [blogs, setblogs] = useState([]);


    const navigate = useNavigate();

  const handleCreateBlogClick = () => {
    // Use the navigate function to navigate to the '/createblog' route
    navigate('/createblog');
  };




    
  useEffect(() => {
    // Fetch course data from your Django backend with the selectedCategory filter
    axios.get(`/usercheck/${userId}/`)
      .then((response) => {
        setuserblog(response.data);
        console.log("test",response.data);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch course data from your Django backend with the selectedCategory filter
    axios.get('/viewblogs')
      .then((response) => {
        setblogs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, []);




  return (
    <div>

        <Customenavbar/>
        <Bloghero/>

        <div class="flex ">

  <div class="w-full bg-[#90c6e8] h-14 flex items-center justify-center"> 
  {userblog.user == true ? (
    <a  class="inline-block px-5 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700" onClick={handleCreateBlogClick}>
      Add Blog +
    </a>
            ):""}
  </div>

</div>






       

       <div className="p-4">
        <div className="w-full flex flex-wrap bg-white-500 gap-4">
          {blogs.map((blog) => (
            <Blogcard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
        
    </div>
  )
}

export default Blogpage
