import React, { useState } from 'react';
import axios from '../../../axios';
import Customenavbar from '../../User/Navbar/Customenavbar';
import logo from '../../../static/teacher.jpg';
import { useNavigate } from 'react-router-dom';

function Vendorsignup() {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    bankaccount: '',
    ifse: '',



    password: '',
    id_proof: null, // Use lowercase 'id_proof'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, id_proof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data including files
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('bankaccount', formData.bankaccount);
    formDataToSend.append('ifse', formData.ifse);



    formDataToSend.append('password', formData.password);
    formDataToSend.append('id_proof', formData.id_proof); // Use lowercase 'id_proof'

    try {
      console.log(formDataToSend)
      // Send the form data to your backend API
      const response = await axios.post('vendorsignup/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Vendor registration successful.');
        navigate('/vendor/vendorsuccesfull'); // Replace '/success' with your desired route

      }

    } catch (error) {
      console.error('Error registering vendor:', error);
      setError('Error registering vendor. Please check your information and try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Customenavbar />
      <div class=" md:flex  md:h-[770px]">
            <div class="flex md:w-1/2 bg-white ">
            <img
                  className="md:h-[770px] md:mt- mt-20 w-full"
                  src={logo}
                  alt="Your Company"
                />

            </div>
            <div class="md:w-1/2 bg-white md:p-11 justify-center">
            <div className="md:mt-16  md:p-6 p-4 flex-grow bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold  md:pl-64 pl-24 p-2">Vendor Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="bankaccount"
              placeholder="bankaccount"
              value={formData.bankaccount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="ifse"
              placeholder="ifse"
              value={formData.ifse}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <p>Attach a proof</p>
          <div>

            <input
              type="file"
              name="id_proof"
              
              onChange={handleFileChange} // Use lowercase 'id_proof'
              className="w-full p-2 border rounded bg-blue-100 " // Replace "bg-blue-100" with the desired background color class
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
  </div>
</div>
      
    </div>
  );
}

export default Vendorsignup;
