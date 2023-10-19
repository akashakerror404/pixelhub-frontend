import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from '../../../axios'
import Vendornav from '../Vendornavbar/Vendornav';
import { useSelector ,useDispatch } from 'react-redux';


function Addvideos() {
    const navigate = useNavigate();

    const { userId } = useSelector((state) => state.user); // Assuming you have the userId available in your Redux state
    const { courseId } = useParams();
    const [description, setDescription] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      // Create a FormData object to send the form data
      const formData = new FormData();
      formData.append('description', description);
      formData.append('course', courseId);
      formData.append('video', selectedVideo);
    //   formData.append('userId', userId); // Add userId to the form data

      console.log(formData)
  
      // Make an Axios POST request to send the form data to the backend
      axios
        .post('/addvideo/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file uploads
          },
        })
        .then((response) => {
          // Handle success
          console.log('Video uploaded successfully:', response.data);
          if (response.status === 201) {
            // Navigate to the course management page
            navigate(`/vendor/videos/${courseId}`);
          }
        })
        .catch((error) => {
          // Handle error
          console.error('Error uploading video:', error);
        });
    };
  return (
    <div>
        <Vendornav/>
    <div className="bg-[#1F2A40] min-h-screen flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl mb-4 text-center text-gray-800">Add Videos for Course {courseId}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block text-gray-700">Choose Video:</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setSelectedVideo(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Upload Video
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  
  )
}

export default Addvideos
