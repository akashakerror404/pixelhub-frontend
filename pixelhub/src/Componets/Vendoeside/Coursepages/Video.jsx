import React, { useState, useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
// import Adminnavbar from '../Adminnav/Adminnavbar';
import axios from '../../../axios';
import Vendornav from '../Vendornavbar/Vendornav';
import { API_URL } from '../../Baseurl';

function Videos() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const navigate = useNavigate(); // Get the navigate function


  useEffect(() => {
    // Fetch videos for the specific course using Axios
    axios
      .get(`/videos/${courseId}/`)
      .then((response) => {
        if (Array.isArray(response.data.videos)) {
          setVideos(response.data.videos);
        } else {
          console.error('Response data.videos is not an array:', response.data.videos);
        }
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, [courseId]);

  const openVideoPopup = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  const closeVideoPopup = () => {
    setSelectedVideoUrl('');
  };

  const deleteVideo = (videoId) => {
    // Send a DELETE request to the backend to delete the video with the specified videoId
    axios
    .delete(`deletevideo/${videoId}/`)
    .then((response) => {
        console.log('Video deleted successfully:', response);
        
        // Update the videos list after deletion
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      })
      .catch((error) => {
        console.error('Error deleting video:', error);
      });
  };

  return (
    <div>
        <Vendornav/>
            <div class="flex">
        <div class="w-1/2 bg-[#1F2A40] h-12">
          <p className='pl-24 text-2xl text-white mt-3'>Avilabile Videos</p>
        </div>
        <div class="w-1/2 bg-[#1F2A40] h-12 flex justify-end items-center">
        <button
            onClick={() => {
                // Use the navigate function to go to the "Add Videos" page with the courseId as a parameter
                navigate(`/vendor/addvideos/${courseId}`);
            }}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded"
            >
            Add Videos
            </button>

        </div>
      </div>
      <hr></hr>


      <div>
      <div className="mx-auto">
        <table className="min-w-full bg-[#1F2A40] text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Delete</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Video</th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No videos available. Add videos.
                </td>
              </tr>
            ) : (
              videos.map((video, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{video.description}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {/* Add a click event to call deleteVideo and pass video.id */}
                    <button
                      onClick={() => deleteVideo(video.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {/* Open the video in a popup when clicked */}
                    <button
                      onClick={() => openVideoPopup(`${API_URL}${video.video_url}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Video
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedVideoUrl && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-md">
                <div className='flex justify-end'>
                    <button
                    onClick={closeVideoPopup}
                    className="mb-2 bg-red-500 w-6 hover:bg-red-700 text-white font-bold rounded-full"
                    >
                    X
                    </button>
                </div>
                <div className="video-container">
                    <video
                    width="560"
                    height="315"
                    controls // This adds default video controls (play, pause, seek)
                    title="Video Popup"
                    >
                    <source src={selectedVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
                </div>
            </div>
            )}

      </div>
      </div>

    </div>
  );
}

export default Videos;
