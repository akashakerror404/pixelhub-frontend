import React, { useState } from 'react';
import Lottie from 'lottie-react';
import forget from '../../../Animations/forget.json';
import email from '../../../Animations/email.json';

import Customenavbar from '../Navbar/Customenavbar';
import axios from '../../../axios'

function Forgotpassword() {
  const [username, setUsername] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
console.log(isSuccess)

  const handleSubmit = () => {
    // Create a data object to send to the backend
    const data = { username };

    // Make an Axios POST request to your backend
    axios.post('/forgetpassword', data)
      .then((response) => {
        // Handle the response from the backend here
        console.log('Response from the server:', response.data);
        if (response.status === 201) {
            // Update the state variable to indicate success
            setIsSuccess(true);
          }
      })
      .catch((error) => {
        // Handle any errors from the request
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Customenavbar />
      <div className="md:flex mb-4">
        <div className="md:w-1/2 bg-white">
            {isSuccess ?
            <Lottie animationData={email} />:
            <Lottie animationData={forget} />
            }
          
        </div>
        {isSuccess ? <div className="md:w-1/2 bg-white-500 flex items-center p-4">
          <div className="bg-white mx-auto rounded-lg md:p-20 p-10 border border-blue hover:border-blue-700 transition duration-300 ease-in-out">
            <h2 className="font-normal mb-2 text-xl text-center subpixel-antialiased">Reset password Sucessfull</h2>
            <p className="text-gray-500 mb-3">We will send link on your registerd mail id very and change password </p>
         

          

          </div>
        </div>:
        <div className="md:w-1/2 bg-white-500 flex items-center p-4">
          <div className="bg-white mx-auto rounded-lg md:p-20 p-10 border border-blue hover:border-blue-700 transition duration-300 ease-in-out">
            <h2 className="font-normal mb-2 text-xl text-center subpixel-antialiased">Forgot Password</h2>
            <p className="text-gray-500 mb-3"> </p>
            <input
              className="mb-4 w-full border border-gray-300  px-3 py-2 outline-none focus:border-blue-500 text-lg"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button
              className="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>

          </div>
        </div>
        
        }
      </div>
    </div>
  );
}

export default Forgotpassword;
