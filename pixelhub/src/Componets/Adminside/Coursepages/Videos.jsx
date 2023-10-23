import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Adminnavbar from '../Adminnav/Adminnavbar';
import axios from '../../../axios';
import { API_URL } from '../../Baseurl';

function Videos() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

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

  return (
    <div>
      <Adminnavbar />
      <div className='h-screen'>
      <div className="">
        <div className="w-full bg-[#1F2A40] h-12">
          <p className='text-2xl pl-14 text-white'>Available Videos</p>
          <hr></hr>
        </div>
      </div>

      <div>
        <div className="mx-auto ">
          <table className="min-w-full bg-[#1F2A40] text-white ">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">SI</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">View Video</th>
              </tr>
            </thead>
            <tbody>
              {videos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No videos available for this course.
                  </td>
                </tr>
              ) : (
                videos.map((video, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{video.description}</td>
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
    </div>
  );
}

export default Videos;
