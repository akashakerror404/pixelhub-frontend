import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import Customenavbar from '../Navbar/Customenavbar';
import logo from '../../../static/blog hero.jpg';
import { API_URL } from '../../Baseurl';
import { useSelector, useDispatch } from 'react-redux';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';
import { FaComment } from 'react-icons/fa6';

function Blogdetailpage() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState({});
  const [check, setCheck] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [showLastComment, setShowLastComment] = useState(false);
  const [newComment, setNewComment] = useState("");


  const { isAuthenticated, username, userId, role } = useSelector((state) => state.user);

  const handleLikeClick = () => {
    axios.post(`/like/${id}/${userId}/`)
      .then((response) => {
        if (response.status === 201) {
          setCheck(!check);
        }
      })
      .catch((error) => {
        console.error('Error handling like:', error);
      });
  };

  const handleunlikeClick = () => {
    axios.delete(`/unlike/${id}/${userId}/`)
      .then((response) => {
        if (response.status === 204) {
          setCheck(!check);
        }
      })
      .catch((error) => {
        console.error('Error handling like:', error);
      });
  };

  const handleComments = () => {
    setShowLastComment(!showLastComment); 

    axios.get(`/comments/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setAllComments(response.data);
          console.log(response.data)
          
        }
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(() => {
    axios.get(`/likecheck/${id}/${userId}/`)
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog details:', error);
      });
  }, [check]);

  useEffect(() => {
    axios.get(`/blogdetail/${id}/`)
      .then((response) => {
        setBlog(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching blog details:', error);
      });
  }, [id]);




  const submitComment = (e) => {
    e.preventDefault();
  
    // Make an Axios POST request to submit the comment
    axios
      .post('/addcomment/', {
        comment: newComment,
        user: userId, // Include userId from your state
        blog: id, // Include BlogId from your state
      })
      .then((response) => {
        // Handle the response, for example, you can update the list of comments
        handleComments(); // Refresh the list of comments after submitting a new one
        setNewComment(""); // Clear the input field
        setCheck(!check);

      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };
  

  return (
    <div className="h-screen">
      <Customenavbar />
      <div className="flex">
        <div className="w-full bg-[#b9cfdeb8] justify-center items-center p-5">
          <div className="flex flex-shrink-0 items-center justify-center">
            <img
              className="md:h-96 h-48 w-auto rounded-md"
              src={`${API_URL}${blog.image}`}
              alt="Your Company"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-full bg-white p-2">
          <h1 className="text-3xl md:ml-20 mb-3 font-medium">{blog.headline}</h1>
          <h1 className="text-xl md:ml-20 mb-3"> {blog.username}</h1>

          <p className="text-xl md:ml-20 text-gray-500">{new Date(blog.date_and_time).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex">
        <div className="bg-white h-10 md:ml-24 ml-4">
          {comment.user_liked ? (
            <VscHeartFilled size={30} color="red" onClick={handleunlikeClick} />
          ) : (
            <VscHeart size={30} onClick={handleLikeClick} />
          )}
          <span className="ml-2">{comment.likes}</span>
        </div>
        <div className="ml-4" onClick={handleComments}>
          <FaComment size={30} />
          <span className="ml-2">{comment.comments}</span>
        </div>
        <div className="w-1/2 bg-white h-10"></div>
      </div>
      <div className="flex mb-4">
        <div className="w-full bg-white-500">
          <p className="md:ml-20 p-4">{blog.content}</p>
          
        {showLastComment && <div className='p-4'>
            <p className='mb-4 md:ml-20 text-xl font-mono '>Comments</p>
            {username &&  <div class=" md:ml-20">
            <form onSubmit={submitComment} className="w-full p-4">
            <div className="mb-2">
              <label htmlFor="comment" className="text-lg text-gray-600">
                Add a comment
              </label>
              <textarea
                className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                name="comment"
                placeholder=""
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
            >
              Comment
            </button>
          </form>
            </div>
            }


          {allComments.map((comment) => (
              <div key={comment.id} className='md:ml-20  ml-2  p-4 border-l-4 border-indigo-500  '>
                <p> {comment.username}</p>
                <p> {comment.comment}</p>
                <p className='text-gray-500'>{new Date(comment.date_and_time).toLocaleDateString()}</p>
              </div>
            ))}
        </div>
}
        </div>
      </div>
    </div>
  );
}

export default Blogdetailpage;
