import React from 'react';

function Search({ value, onChange }) {
  return (
    <div className="relative flex md:w-5/6 w-6/6 h-12 rounded-lg focus-within:shadow-lg bg-[#e6faec] overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2d737a">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-10 bg-[#e6faec]"
        type="text"
        id="search"
        placeholder="Search something.."
        value={value}
        onChange={onChange}
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2d737a" className="h-8 w-8 absolute right-2 top-2 text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
}

export default Search;
