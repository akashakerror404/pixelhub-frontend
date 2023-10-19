import React, { useState, useEffect } from 'react';
import Customenavbar from '../Navbar/Customenavbar';
import Coursecardmain from './Coursecardmain';
import Coursefilter from './Coursefilter';
import Search from './Search';
import axios from '../../../axios';

function Coursepage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('/courses_all')
      .then((response) => {
        setCourses(response.data);
        setFilteredCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  useEffect(() => {
    // Apply both category and search filters
    const filtered = courses.filter((course) => {
      return (
        (selectedCategory === null || course.category === selectedCategory) &&
        (course.coursename?.toLowerCase().includes(searchInput.toLowerCase()))
      );
    });

    setFilteredCourses(filtered);
  }, [selectedCategory, searchInput, courses]);

  return (
    <>
      <Customenavbar />
      <Coursefilter
        onSelectCategory={setSelectedCategory}
        onSearch={setSearchInput}
      />

      <div className='w-full  bg-[#f2f5eb] p-6 md:h-screen h-f'>
        <div className="md:flex mb-5 justify-center">
          <div className="md:w-1/2 bg-[#f2f5eb] h-12 md:mb-0 mb-4  md:pl-28">
            <h1 className='py-3 text-3xl'>All <span className='text-black'>Courses</span></h1>
          </div>
          <div className="md:w-1/2 bg-[#f2f5eb] h-12 md:mb-0 mb-4">
            <Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </div>
        </div>

        <div className='md:ml-24'>
          <div className='md:flex flex-wrap bg-[#f2f5eb] justify-start '>
            {filteredCourses.map((course) => (
              <Coursecardmain key={course.id} course={course} className='md:w-1/4' />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Coursepage;
