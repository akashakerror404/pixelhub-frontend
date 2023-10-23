import React ,{useState,navigate,useEffect}from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import logo from '../../../static/logopixel.png';
import Customenavbar from '../Navbar/Customenavbar';
import { useDispatch,useSelector } from 'react-redux';
import {setUserData} from '../../../Store/Actions/UserAction'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axios'
import earth from '../../../Animations/earth.json';
import Lottie from 'lottie-react'
import camera from '../../../Animations/camera.json';


function Signin() {
  const dispatch=useDispatch();
  const navigate = useNavigate();


   const [username, setUsername] = useState('');
 
   const [password, setPassword] = useState('');
   const [showEarth, setShowEarth] = useState(true);

 
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


      const accessToken=data.access
      // const role=data.role
      const role = data.is_vendor ? 300 : "";

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
      if (role === 300) {
        // Navigate to the 'course' page or any other destination for vendors
        navigate('/vendor/dashboard'); // Adjust the URL as needed
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

  useEffect(() => {
    // After 10 seconds, switch to the next animation
    const timeout = setTimeout(() => {
      setShowEarth(false);
    }, 10000);

    // Set up a loop to switch animations every 20 seconds
    const loopInterval = setInterval(() => {
      setShowEarth((prev) => !prev);
    }, 20000);

    // Clear the intervals when the component unmounts
    return () => {
      clearTimeout(timeout);
      clearInterval(loopInterval);
    };
  }, []);
  


  return (
    <>
    <Customenavbar/>
    <ToastContainer position="top-center" autoClose={5000} />

    <section className=" w-full bg-neutral-200 dark:bg-neutral-700">
  <div className="  p-7 pt-24 ">
    <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
      <div className="w-full">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap">
           
            <div className="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-white ">
            <div className="flex md:w-12/12 md:flex-col justify-center my-3">
            {showEarth ? (
                <Lottie animationData={camera}  />
              ) : (
                // <Lottie animationData={camera}  />)
                <Lottie animationData={camera}   />)

              }


           
            </div>

        </div>

            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
                <div className="flex justify-center items-center">
                  <img
                    className="mx-auto w-40"
                    src={logo}
                    alt="logo"
                  />
                 
                </div>

                <div className="bg-white mx-auto rounded-lg max-w-md p-1">
                <div className="p-5 w-100 flex flex-col items-center">
                    <h2 className="font-normal mb-2 text-xl text-center subpixel-antialiased">Sign In</h2>
                    <p className="text-gray-500 mb-3"></p>
                    <input
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
               
                  
                    <input
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
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
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-500">
                        Sign Up
                    </a>
                    </p>
                    <hr className="my-4" />
                    {/* Add your Google sign-in button or content here */}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
);
}

export default Signin
