import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { useSelector } from 'react-redux';

function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { username, userId } = useSelector((state) => state.user);

  const [categories, setCategories] = useState([]);
  const [courseData, setCourseData] = useState({
    coursename: '',
    headline: '',
    description: '',
    category: '',
    price: '',
    discount_percentage: '',
    about: '',
  });

  useEffect(() => {
    // Fetch course details based on the courseId
    axios.get(`/courses/${courseId}/`).then((response) => {
      setCourseData(response.data);
    });

    axios.get('categories').then((response) => {
      setCategories(response.data);
    });
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/editcourses/${courseId}/`, courseData);

      if (response.status === 200) {
        // Course update was successful
        // Redirect or show a success message
        console.log('Course updated successfully');
        navigate('/vendor/coursemanage');
      }
    } catch (error) {
      // Handle error, show error message, etc.
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="p-4 bg-[#1F2A40] text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Edit Course Information</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="coursename" className="block text-sm font-medium text-white">
              Course Name
            </label>
            <input
              type="text"
              name="coursename"
              id="coursename"
              onChange={handleInputChange}
              value={courseData.coursename}
              className="block w-full rounded-md bg-gray-800 text-white py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-white">
              Headline
            </label>
            <input
              type="text"
              name="headline"
              id="headline"
              onChange={handleInputChange}
              value={courseData.headline}
              className="block w-full rounded-md bg-gray-800 text-white py-2 px-3"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleInputChange}
            value={courseData.description}
            className="block w-full rounded-md bg-gray-800 text-white py-2 px-3"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-[#1F2A40]"
              onChange={handleInputChange}
              value={courseData.category}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-white">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleInputChange}
            value={courseData.price}
            className="block w-full rounded-md bg-gray-800 text-white py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="discount_percentage" className="block text-sm font-medium text-white">
            Discount Percentage
          </label>
          <input
            type="number"
            name="discount_percentage"
            id="discount_percentage"
            onChange={handleInputChange}
            value={courseData.discount_percentage}
            className="block w-full rounded-md bg-gray-800 text-white py-2 px-3"
          />
        </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-white">
            About
          </label>
          <textarea
            id="about"
            name="about"
            rows={3}
            onChange={handleInputChange}
            value={courseData.about}
            className="block w-full rounded-md bg-gray-800 text-white py-2 px-3"
          />
        </div>
        

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;
