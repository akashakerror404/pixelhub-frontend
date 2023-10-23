import React ,{useState,navigate,useEffect}from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import logo from '../../../static/logopixel.png';
import Customenavbar from '../Navbar/Customenavbar';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axios'
import { Link } from 'react-router-dom';
import camera from '../../../Animations/camera.json';
import Lottie from 'lottie-react'
import earth from '../../../Animations/earth.json';

function Signup() {
     const navigate=useNavigate();


   

    //  above code is text one by one came

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showEarth, setShowEarth] = useState(true);


    const [passwordStrength, setPasswordStrength] = useState({
      hasUppercase: false,
      hasDigit: false,
    });
  
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
  
      const uppercaseRegex = /[A-Z]/;
      const hasUppercase = uppercaseRegex.test(newPassword);
  
      const digitRegex = /\d/;
      const hasDigit = digitRegex.test(newPassword);
  
      setPasswordStrength({ hasUppercase, hasDigit });
    };
    
  

  
    const handleSubmit = async () => {
      if (!passwordStrength.hasUppercase || !passwordStrength.hasDigit) {
        toast.error('Password must contain at least one uppercase letter and one digit.');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Password and Confirm Password do not match.');
        return;
      }
      // Access form data from state variables
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('phone:', phone);

      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      try{

        const userData = {
          username,
          email,
          password,
          phone,
        };
        const response = await axios.post('/signup',
                       userData ,{headers: 
                      {'Content-Type': 'application/json'},withCredentials : true});
                      if(response.status === 201) {
                        console.log(response.data);
                        navigate(`/otpconfirmation?username=${username}&email=${email}`)
                        // Clear the form fields after successful registration if needed
                      setUsername('');
                      setEmail('');
                      setPassword('');
                      setPhone('');

                      setConfirmPassword('');
                      }
                      if(response.status === 400) {
                        console.log(response.status)
                      }
        
      }catch(error){
        toast.error('username alredy exist.');

        console.error('Login failed:', error.message );
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
 



  return  (
    <>
    <Customenavbar/>
    <ToastContainer position="top-center" autoClose={5000} />
    <div class="md:flex mb-4">
  <div class="md:w-1/2 bg-white ">
  {showEarth ? (
                <Lottie animationData={earth}  />
              ) : (
                // <Lottie animationData={camera}  />)
                <Lottie animationData={camera}  />)

              }

  </div>
  <div class="md:w-1/2 bg-white ">
  <div className="px-4 md:px-0 ">
              <div className="md:mx-6 md:p-12">
                {/* <!--Logo--> */}
                <div className="hidden md:flex justify-center items-center">
                  <img
                    className="mx-auto w-40"
                    src={logo}
                    alt="logo"
                  />
                 
                </div>

                <div className="bg-white mx-auto rounded-lg max-w-md p-1 shadow-xl">
                <div className="p-5 w-100 flex flex-col items-center">
                    <h2 className="font-normal mb-2 text-xl text-center subpixel-antialiased">Sign Up</h2>
                    <p className="text-gray-500 mb-3"></p>
                    <input
                    className="mb-4 w-full border rounded-full border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    
                    <input
                    className="mb-4 w-full border rounded-full border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                     <input
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {!passwordStrength.hasUppercase && password.length > 0 && (
                    <p className="text-red-500 text-sm">Password must contain at least one uppercase letter.</p>
                  )}
                  {!passwordStrength.hasDigit && password.length > 0 && (
                    <p className="text-red-500 text-sm">Password must contain at least one digit.</p>
                  )}
                    <input
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="password"
                    placeholder="Re-enter Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                     {password !== confirmPassword && confirmPassword !== '' && (
                    <p className="text-red-500 text-sm">Password and Confirm Password do not match.</p>
                  )}
                  <button class="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:text-white hover:bg-blue-700" onClick={handleSubmit}>Signup</button>

                  
                    
                    <hr className="my-4" />
                    <p className="text-gray-700 text-base mt-3 text-center">
                    Are you a ?{' '}
                    <Link to="/vendor/vendorsignup" className="text-blue-500">
                    teacher
                    </Link>
        </p>
                    {/* Add your Google sign-in button or content here */}
                </div>
                </div>
              </div>
            </div>
  </div>
</div>

 
</>
);
}

export default Signup
