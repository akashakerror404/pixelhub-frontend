import React, { useState,useEffect } from 'react';
import Customenavbar from '../Navbar/Customenavbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../axios'


function Newpasswrod() {
    const navigate = useNavigate();
const {userid} = useParams()
console.log(userid)

  const [password, setPassword] = useState(''); // State for the password input

  const handleSubmit = () => {
    const userData = {
        userid:userid,
      password: password,
    };
  console.log(userData)
    axios
      .post('newpassword', userData)
      .then((response) => {
        console.log('Response from the backend:', response.data);
        if (response.status === 200) {
            navigate('/signin')

            // Password change successful
            alert('Password changed successfully');
          } else if (response.status === 404) {
            // User not found
            alert('User not found');
          }
        // You can perform further actions based on the response
      })
      .catch((error) => {
        console.error('Error:', error);
        // You can display an error message to the user, if needed
      });
  };

  return (
    <div>
      <Customenavbar />
      <div className='items-center p-4'>

      <div className="bg-white-500 mx-auto rounded-lg max-w-md p-1 md:mt-52 mt-40 border border-blue hover:border-blue-700 transition duration-300 ease-in-out">
        <div className="p-5 w-100 flex flex-col items-center">
          <h2 className="font-normal mb-2 text-xl text-center subpixel-antialiased">Set New Password</h2>
          <p className="text-gray-500 mb-3"></p>
          {/* <input
            className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}

          <input
            className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
            type="password"
            placeholder=" New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:text-white hover:bg-blue-700" onClick={handleSubmit}>Reset Password</button>


         

          <hr className="my-4" />
          {/* Add your Google sign-in button or content here */}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Newpasswrod;
