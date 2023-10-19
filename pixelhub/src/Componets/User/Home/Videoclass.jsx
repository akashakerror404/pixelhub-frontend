import React, { useState, useEffect } from 'react';
import Customenavbar from '../Navbar/Customenavbar';
import { useLocation } from 'react-router-dom';
import axios from '../../../axios';
import videoimage from '../../../static/pixelvideo.jpg';


function Videoclass() {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const courseid = queryParams.get('courseid');
  const coursename = queryParams.get('coursename');
  console.log("selectedVideoUrl", selectedVideoUrl);

  useEffect(() => {
    // Fetch videos for the specific course using Axios
    axios
      .get(`/videos/${courseid}/`)
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
  }, [courseid]);

  const openVideo = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    console.log(videoUrl+"ulrs here")
  };

  return (
    <>
      <Customenavbar />
      <div className="md:flex mb-4">
      <div className="md:w-3/4 bg-white-500">
          {selectedVideoUrl ? (
            <video key={selectedVideoUrl} className="w-full h-full shadow-lg" autoPlay loop controls >
              <source src={selectedVideoUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={videoimage} alt="Placeholder Image" className="w-full h-full" />
          )}
        </div>

        <div className="md:w-1/4 md:p-8 p-4 place-items-center bg-white-500 shadow-sm">
          <h1 className="text-lg font-bold mb-3">{coursename}</h1>
          <hr />
          <div className="p-6 bg-white-700 z-50 md:h-[32rem] h-[16rem] mt-2 mb-2 overflow-y-auto scroll-smooth hover:scroll-auto">
            <ul className="list-disc mb-2">
              {videos.map((video) => (
                <li
                  key={video.id}
                  onClick={() => openVideo(`http://127.0.0.1:8000${video.video_url}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {video.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Videoclass;
