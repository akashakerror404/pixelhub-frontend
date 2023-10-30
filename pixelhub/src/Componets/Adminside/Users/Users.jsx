import React, { useEffect, useState } from 'react';
import Adminnavbar from '../Adminnav/Adminnavbar';
// import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axios'
import PrivateAxios from '../../../interceptor/Interceptor';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await PrivateAxios.get('/userlist');
        setUsers(response.data.userlist);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchUserData();
  }, []);

  const blockUser = async (userId) => {
    try {
        const response = await axios.post(`/block-user/${userId}/`);
        console.log("User blocked successfully:", response.data);
        console.log(response.data.userlist);
        const updatedUser = response.data.userlist.userlist
        const index = users.findIndex((user) => user.id === updatedUser.id);
        // Update the user in the list with the updated data
        if (index !== -1) {
          const updatedUsers = [...users];
          updatedUsers[index] = updatedUser;
          setUsers(updatedUsers);
        }

      toast.success('User blocked successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // After blocking the user, you may want to refresh the user list
      // You can call your fetchUserData function again here to update the list
    } catch (error) {
      console.log('Error blocking user', error);
      toast.error('Error blocking user', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const unblockUser = async (userId) => {
    try {
      const response =await axios.post(`/unblock-user/${userId}/`);
      console.log("User Unblocked successfully:",response.data)
      console.log(response.data.userlist);
      const updatedUser = response.data.userlist.userlist
      const index = users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        setUsers(updatedUsers);
      }
      toast.success('User Unblocked successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // After blocking the user, you may want to refresh the user list
      // You can call your fetchUserData function again here to update the list
    } catch (error) {
      console.log('Error blocking user', error);
      toast.error('Error blocking user', {
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
    setPageNumber(0); // Reset page number when the search query changes
  };
  
  const filteredUsers = users.filter((user) =>
  user?.username?.toLowerCase().includes(searchQuery?.toLowerCase() ?? "")
);


  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedUsers = filteredUsers.slice(
    pageNumber * usersPerPage,
    (pageNumber + 1) * usersPerPage
  );

  return (
    <div className='bg-[#1F2A40] h-full'>
      <Adminnavbar />
      <ToastContainer position="top-center" autoClose={5000} />
      <div className='bg-[#1F2A40]'>
        <div className="flex mb-4 md:p-8 p-3">
          <div className="w-full bg-[#1F2A40] h-24 rounded-md">
            <p className='md:text-3xl text-2xl pl-5 mt-2 text-white mb-4'>Users</p>
            <div className="relative flex md:w-full w-7/3 h-12 rounded-lg focus-within:shadow-lg bg-[#f2f5eb] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2d737a"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className='md:p-8 p-2'>
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-white  ">
            <thead className="text-xs text-white uppercase bg-[#141B2D] ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SI NO
                </th>
                <th scope="col" className="px-6 py-3">
                  User name
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
              {displayedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="bg-[#141B2D] border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white">
                    {user.id}
                  </th>
                  <td className="px-6 py-4">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.phone}
                  </td>
                  <td className="md:px-6 md:py-4 px-1">
                  {user.is_active ? (
                <button
                    onClick={() => blockUser(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white md:font-bold py-2 px-4 rounded"
                >
                    Block user
                </button>
                ) : (
                <button
                    onClick={() => unblockUser(user.id)} // Use the unblockUser function for unblocking
                    className="bg-red-500 hover:bg-red-700 text-white md:font-bold py-2 px-4 rounded"
                >
                    Unblock user
                </button>
                )}


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-8'>
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

export default Users;
