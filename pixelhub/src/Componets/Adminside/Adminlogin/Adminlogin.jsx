import React ,{useState,navigate,useEffect}from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import logo from '../../../static/adminlogo.png';
import { useDispatch,useSelector } from 'react-redux';
import {setUserData} from '../../../Store/Actions/UserAction'
// import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axios'
import admin from '../../../Animations/admin.json';
import Lottie from 'lottie-react'


function Adminlogin() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
   
  
     const [username, setUsername] = useState('');
   
     const [password, setPassword] = useState('');
   
     const handleSubmit = async (e) => { // Add 'async' here
      e.preventDefault();
      const user = {
        username: username,
        password: password,
  
      };
      try {
        // Create the POST request
        const { data } = await axios.post(
          '/token/',
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        console.log(data)


        let role;

        if (data.is_superuser) {
          role = 400;
        } else {
          // Set the role to some other value if is_superuser is false
          role = ""
        }
          
  
        const accessToken=data.access
        
        // const role=data.role
        // const role = data.is_superuser; 



  
        const userId=data.id
        console.log(userId)
  
        
  
    
        // Initialize the access & refresh token in local storage.
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
  
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('userid',data.id);
        localStorage.setItem('username',username);
        dispatch(setUserData({username,role,userId}))
  
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        if (role === 400) {
          // Navigate to the 'course' page or any other destination for vendors
          navigate('/admin/dashboard'); // Adjust the URL as needed
        } else {
          // Navigate to a different page for non-vendors
          navigate('/');
        }
      } catch (error) {
        if (error.response) {
          // If the server returns an error response
          if (error.response.status === 401) {
            // Unauthorized (user name or password not matched)
            toast.error('User name or password do not match.');
          } else {
            // Other server errors
            toast.error('An error occurred during login. Please try again later.');
          }
        } else {
          // Network error or other client-side error
          toast.error('An error occurred. Please check your network connection.');
        }
      
  
        // Handle any errors here
        console.error(error);
      }
    };
    
  
  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} />
    <div class="md:flex h-[810px]">
    <div class="md:w-1/2 bg-white ">
    <Lottie animationData={admin}/>

  </div>
  <div class="md:w-1/2 bg-white md:p-24 p-4">

  <div className="bg-[#8cbfd0] mx-auto mt-40 rounded-lg ">
    
    <div className="p-5 w-100 flex flex-col items-center">
        <h2 className="font-normal mb-2 text-xl text-black text-center subpixel-antialiased">ADMIN LOGIN</h2>
            <p className="text-gray-500 "></p>
                <input
                    className="mb-4 w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
               
                  
                <input
                    className="mb-4 w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                  
              <button class="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:text-white hover:bg-blue-700" onClick={handleSubmit}>Signin</button>

                    {/* <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg"
                    onClick={handleSubmit}
                    >
                    Sign Up
                    </button> */}
                    <p className="text-gray-700 mt-3 text-center">
                        Back to 🏠{' '}
                        <Link to="/" className="text-blue-500">
                            Home
                        </Link>
                        </p>
                    <hr className="my-4" />
                    {/* Add your Google sign-in button or content here */}
                </div>
                </div>
  </div>
</div>


</>
  )
}

export default Adminlogin
