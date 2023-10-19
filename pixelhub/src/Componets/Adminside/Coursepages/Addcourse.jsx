import React, { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Adminnavbar from '../Adminnav/Adminnavbar';
// import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios'

function Addcourse() {
  const navigate=useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const [categories, setCategories] = useState([]);
  const [courseData, setCourseData] = useState({
    coursename: '',
    headline: '',
    description: '',
    category: '', // You can set the selected category here
    price: '',
    discount_percentage: '', // Fix the name to match the backend
    about: '', // Add about field

  });

  useEffect(() => {
    // Fetch categories from the backend and populate the categories state
    axios.get('categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    // Append all form fields to the FormData object
    Object.keys(courseData).forEach((key) => {
      formData.append(key, courseData[key]);
    });
    if (formData.get('image')) {
      console.log('Image is attached to the FormData.');
    } else {
      console.log('No image attached to the FormData.');
    }
  
  
    try {
      const response = await axios.post('/coursescreate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
  
      if (response.status === 201) {
        // Course creation was successful
        // Redirect or show a success message
        console.log('Course created successfully.');
        navigate('/coursemanage')
      }


    } catch (error) {
      // Handle error, show error message, etc.
      console.error('Error creating course:', error);
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCourseData({
        ...courseData,
        coverphoto: file, // Set the coverphoto field to the selected file
      });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div>
      <Adminnavbar />
      <div className="md:p-6 p-4 bg-[#1F2A40] text-white">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">Add Course Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="courseName" className="block text-sm font-medium leading-6 text-white">
                  Course Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="coursename"
                    id="coursename"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#1F2A40]"
                    onChange={handleInputChange}
                    value={courseData.coursename}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="headline" className="block text-sm font-medium leading-6 text-white">
                  Headline
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="headline"
                    id="headline"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#1F2A40]"
                    onChange={handleInputChange}
                    value={courseData.headline}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    // autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#1F2A40]"
                    onChange={handleInputChange}
                    value={courseData.description}
                  />
                </div>
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
              value={courseData.id}
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

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#1F2A40]"
                    onChange={handleInputChange}
                    value={courseData.price}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="discount_Price" className="block text-sm font-medium leading-6 text-white">
                  Discount Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discount_percentage"
                    id="discount_percentage"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#1F2A40]"
                    onChange={handleInputChange}
                    value={courseData.discount_percentage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-[#1F2A40]"
                      defaultValue={courseData.about}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white">Write a few sentences about Course.</p>
                </div>

                <div className="col-span-full">
  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
    Cover photo
  </label>
  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white-900/25 px-6 py-10">
    <div className="text-center">
      {imagePreview && (
        <img
          id="image-preview"
          src={imagePreview}
          alt="Image Preview"
          className="mx-auto h-32 w-32 mb-4"
        />
      )}
      <div className="mt-4 flex text-sm leading-6 text-white">
        <label
          htmlFor="coverphoto" // Update the "for" attribute to match the input id
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span>Upload a file</span>
          <input
            id="coverphoto" // Update the input id to match the "for" attribute
            name="coverphoto" // Set the name attribute to "coverphoto"
            type="file"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
        <p className="pl-1">or drag and drop</p>
      </div>
      <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
    </div>
  </div>
</div>


              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addcourse;
