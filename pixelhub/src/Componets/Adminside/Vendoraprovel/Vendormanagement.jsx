import React, { useEffect, useState } from 'react';
import Adminnavbar from '../Adminnav/Adminnavbar';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axios';

function Vendormanagement() {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const vendorsPerPage = 10;

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get('/vendorviews');
        setVendors(response.data.userlist);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchVendorData();
  }, []);

  const blockVendor = async (vendorId) => {
    try {
      const response = await axios.post(`/block-vendor/${vendorId}/`);
      console.log('Vendor blocked successfully:', response.data);
      const updatedVendor = response.data.userlist.userlist;
      const index = vendors.findIndex((vendor) => vendor.id === updatedVendor.id);

      if (index !== -1) {
        const updatedVendors = [...vendors];
        updatedVendors[index] = updatedVendor;
        setVendors(updatedVendors);
      }

      toast.success('Vendor blocked successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log('Error blocking vendor', error);
      toast.error('Error blocking vendor', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const unblockVendor = async (vendorId) => {
    try {
      const response = await axios.post(`/unblock-vendor/${vendorId}/`);
      console.log('Vendor unblocked successfully:', response.data);
      const updatedVendor = response.data.userlist.userlist;
      const index = vendors.findIndex((vendor) => vendor.id === updatedVendor.id);

      if (index !== -1) {
        const updatedVendors = [...vendors];
        updatedVendors[index] = updatedVendor;
        setVendors(updatedVendors);
      }

      toast.success('Vendor unblocked successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log('Error unblocking vendor', error);
      toast.error('Error unblocking vendor', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(0);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor?.username?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '')
  );

  const pageCount = Math.ceil(filteredVendors.length / vendorsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedVendors = filteredVendors.slice(
    pageNumber * vendorsPerPage,
    (pageNumber + 1) * vendorsPerPage
  );

  return (
    <div className="bg-[#1F2A40] ">
      <Adminnavbar />
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="bg-[#1F2A40] ">
        <div className="flex mb-4 md:p-8 p-3">
          <div className="w-full bg-[#1F2A40] h-24 rounded-md">
            <p className="md:text-3xl text-2xl pl-5 mt-2 text-white mb-4">Vendors</p>
            <div className="relative flex md:w-full w-7/3 h-12 rounded-lg focus-within:shadow-lg bg-[#f2f5eb] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2d737a"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-10 bg-[#f2f5eb]"
                type="text"
                id="search"
                placeholder="Search something.."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2d737a"
                className="h-8 w-8 absolute right-2 top-2 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="md:p-8 p-2">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-white text-white">
            <thead className="text-xs text-white uppercase bg-[#141B2D] text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SI NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Vendor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedVendors.map((vendor, index) => (
                <tr
                  key={vendor.id}
                  className="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white"
                  >
                    {vendor.id}
                  </th>
                  <td className="px-6 py-4">{vendor.username}</td>
                  <td className="px-6 py-4">{vendor.email}</td>
                  <td className="px-6 py-4">{vendor.phone}</td>
                  <td className="md:px-6 md:py-4 px-1">
                    {vendor.is_active ? (
                      <button
                        onClick={() => blockVendor(vendor.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white md:font-bold py-2 px-4 rounded"
                      >
                        Block vendor
                      </button>
                    ) : (
                      <button
                        onClick={() => unblockVendor(vendor.id)}
                        className="bg-red-500 hover:bg-red-700 text-white md:font-bold py-2 px-4 rounded"
                      >
                        Unblock vendor
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-center mt-">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-center text-white"
            pageClassName="hidden"
            activeClassName="bg-blue-500 text-white"
            previousClassName="mr-4"
            nextClassName="ml-4"
          />
        </div>
      </div>
    </div>
  );
}

export default Vendormanagement;
