import React, { useState, useEffect } from 'react';
import axios from '../../../axios';

function Coursefilter({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [toggle, setToggle] = useState(false);


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

  return (
    <>
      <div className='w-full h-[60px] bg-white border-b shadow fixed z-50'>
        <div className='md:max-w-[1240px] max-w-[330px] w-full h-full flex items-center m-auto'>
          <div className="flex flex-shrink-0">
            <h1 className='md:hidden'>FILTER</h1>
          </div>
          <div className='hidden md:flex'>
            <ul className='flex gap-9'>
              <li
                className={`p-4 hover:bg-gray-100 rounded-md ${selectedCategoryId === null ? 'text-red-500 bg-gray-100 ' : ''}`}
                onClick={() => {
                  setSelectedCategoryId(null);
                  onSelectCategory(null);
                }}
              >
                All
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`p-4 hover:bg-gray-100  rounded-md ${selectedCategoryId === category.id ? 'text-red-500 bg-gray-100 ' : ''}`}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    onSelectCategory(category.id);
                  }}
                >
                  {category.categoryname}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden" onClick={() => setToggle(!toggle)}>
            {toggle ? <i className="fa fa-times pl-60 "></i> : <i className="fa fa-bars pl-3"></i>}
          </div>

        </div>

        <div className={toggle ? 'absolute z-50 p-4 bg-white w-full px-8 md:hidden' : 'hidden'}>
          <ul>
            <li
              className={`p-4 hover-bg-gray-100 ${selectedCategoryId === null ? 'text-red-500' : ''}`}
              onClick={() => {
                setSelectedCategoryId(null);
                onSelectCategory(null);
              }}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`p-4 hover-bg-gray-100 ${selectedCategoryId === category.id ? 'text-red-500' : ''}`}
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  onSelectCategory(category.id);
                }}
              >
                {category.categoryname}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='w-full h-[60px] bg-white border-b shadow'></div>
    </>
  );
}

export default Coursefilter;
