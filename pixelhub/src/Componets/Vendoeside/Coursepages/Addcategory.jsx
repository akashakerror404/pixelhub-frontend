import React, { useState } from 'react';
import axios from '../../../axios'
import Vendornav from '../Vendornavbar/Vendornav';
import { useNavigate,Link } from 'react-router-dom';

function Addcategory() {
    const navigate=useNavigate();

  const [category, setCategory] = useState({
    categoryname: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'image' ? files[0] : value;
    setCategory({ ...category, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryname', category.categoryname);
    formData.append('description', category.description);
    formData.append('image', category.image);

    try {
      const response = await axios.post('/addcategories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Category added:', response.data);
      if (response.status === 201) {
        // Course creation was successful
        // Redirect or show a success message
        console.log('Course created successfully');
        navigate('/vendor/addcourse');

  
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>   
    <Vendornav />
    <div className='h-screen bg-[#1F2A40]'>

    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#1F2A40] p-6 rounded-md  border border-white">
        <h1 className="text-3xl text-white mb-4">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="categoryname"
            value={category.categoryname}
            onChange={handleInputChange}
            placeholder="Category Name"
            className="w-full p-2 rounded-md bg-gray-200"
          />
          <input
            type="text"
            name="description"
            value={category.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 rounded-md bg-gray-200"
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Addcategory;
