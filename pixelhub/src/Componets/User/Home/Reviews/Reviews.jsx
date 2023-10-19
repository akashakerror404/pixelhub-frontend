import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import axios from '../../../../axios'


function Reviews({id}) {
  const courseId=id
  const { isAuthenticated, username,userId, role } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState(false);
  console.log(reviews)


  const [newReview, setNewReview] = useState('');
  const [allReviews, setAllReviews] = useState([]); // State for all reviews

  useEffect(() => {
    if ( courseId) {
      // Fetch reviews for the specified course
      axios
        .get('/allreviews/', {
          params: {
            courseId: courseId,
          },
        })
        .then((response) => {
          if (response.data) {
            setAllReviews(response.data); // Set the state with the fetched reviews
            console.log("now recive",response.data)
          }
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [newReview]);






  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

 
  const handleSubmitReview = () => {
    if (newReview.trim() !== '') {
      // Prepare the data to be sent to the backend
      const reviewData = {
        userId: userId,
        courseId: courseId,
        review_message: newReview, // Updated to match your Django view
      };
      console.log(reviewData)
  
      // Make an Axios POST request to send the review data to the backend
      // const response = await axios.post('/coursescreate', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      //   },
      // });
      axios.post('newreviews/', reviewData,{
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },

      })
        .then((response) => {
          // Handle the response from the backend, e.g., update the UI
          console.log('Review submitted successfully:', response.data);
          // Assuming the response contains the updated reviews or confirmation
          // You can update your reviews state accordingly
          setReviews(response.data);
  
          // Clear the newReview input field
          setNewReview('');
        })
        .catch((error) => {
          console.error('Error submitting review:', error);
        });
    }
  };
  


  





  useEffect(() => {
    if (isAuthenticated && userId && courseId) {
      // Make an API request to fetch reviews based on userId and courseId
      axios.get('/reviews/', {
        params: {
          userId: userId,
          courseId: courseId
        }
      })
      .then((response) => {
        // Check if the response data is true, and setReviews accordingly
        if (response.data === true) {
          setReviews(true);
        } else {
          setReviews(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
    }
  }, [userId, courseId]);
  

  
  
  return (
    <div className=" flex justify-center items-center p-4">
      <div className="w-full  flex  flex-col gap-2 p-5 bg-white text-black">
        <h1 className="py-5 text-lg">Reviews</h1>
        {reviews === true ? (
        <div className="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md">
          <input
            type="text"
            value={newReview}
            onChange={handleReviewChange}
            placeholder="Add a review"
            className="p-2 bg-transparent focus:outline-none w-full"
          />
          <button onClick={handleSubmitReview} className="p-2 bg-blue-500 text-white hover:bg-blue-600">
            Submit
          </button>
        </div>
      ) : null}
      

      <div className="flex flex-col gap-3 mt-14">
  {allReviews.map((review) => (
    <div key={review.id} className="flex flex-col gap-4 bg-[#f2f5eb] shadow-lg p-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          {/* Display user initials or profile picture */}
          <div className="w-7 h-7 text-center rounded-full bg-red-500">
            {review.user?.username?.charAt(0).toUpperCase() || 'U'} {/* Use 'U' as a fallback if username is undefined */}
          </div>
          <span>{review.user?.username || 'Unknown User'}</span> {/* Use 'Unknown User' as a fallback if username is undefined */}
        </div>
      </div>
      <div className="flex justify-between">
        <span className='text-gray-500'>{new Date(review.date_and_time).toLocaleDateString()}</span>
      </div>

      <div>{review.review_message}</div>

     
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default Reviews;
