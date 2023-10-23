import React, { useEffect, useState } from 'react';
import Adminnavbar from '../Adminnav/Adminnavbar';
import ReactPaginate from 'react-paginate';
import axios from '../../../axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Baseurl';

Modal.setAppElement('#root');

function Venderaprovel() {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const vendorsPerPage = 10;
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get('/vendorlist');
        console.log('API Response:', response.data.userlist);
        setVendors(response.data.userlist);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchVendorData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(0);
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor?.username?.toLowerCase().includes(searchQuery?.toLowerCase() ?? "")
  );

  const pageCount = Math.ceil(filteredVendors.length / vendorsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Define displayedVendors here
  const displayedVendors = filteredVendors.slice(
    pageNumber * vendorsPerPage,
    (pageNumber + 1) * vendorsPerPage
  );

  const navigate = useNavigate();

  const approveVendor = (vendorId) => {
    // Make an API request to approve the vendor by sending the vendorId
    axios.post('approvevendor', { vendorId })
      .then((response) => {
        // Handle the response here
        if (response.status === 200) {
          console.log('Vendor approved:', response.data);
          // Navigate to usermanagement
          navigate('/admin/vendormanagement');
        } else {
          console.log('Vendor approval failed');
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error('Error approving vendor:', error);
      });
  };
  

  

  return (
    <div className="bg-[#1F2A40] h-screen">
      <Adminnavbar />
      <div className="bg-[#1F2A40]">
        {/* ... (same as before) */}
      </div>

      <div className="md:p-8 p-2">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-white ">
            <thead className="text-xs text-white uppercase bg-[#141B2D] ">
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
                  ID Proof
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
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
                    className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                  >
                    {vendor.id}
                  </th>
                  <td className="px-6 py-4">{vendor.username}</td>
                  <td className="px-6 py-4">{vendor.email}</td>
                  <td className="px-6 py-4">{vendor.phone}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`${API_URL}${vendor.id_proof}`}
                      alt={`ID Proof for ${vendor.username}`}
                      className="max-h-12 cursor-pointer"
                      onClick={() => openLightbox(`${API_URL}${vendor.id_proof}`)}
                    />
                  </td>

                  <td className="px-6 py-4">
                    {vendor.is_active ? (
                        <button className="bg-gray-400 text-white md:font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                        Vendor Approved
                        </button>
                    ) : (
                        <button
                        onClick={() => approveVendor(vendor.id)}
                        className="bg-green-500 hover:bg-green-700 text-white md:font-bold py-2 px-4 rounded"
                        >
                        Approve Vendor
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

      {/* Lightbox */}
      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeLightbox}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
          },
          content: {
            background: 'transparent',
            border: 'none',
            borderRadius: 'none',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <button
          onClick={closeLightbox}
          className="absolute top-0 right-0 m-4 text-white cursor-pointer"
        >
          Close
        </button>
        <img
          src={selectedImage}
          alt="Lightbox"
          className="max-h-screen max-w-screen"
        />
      </Modal>
    </div>
  );
}

export default Venderaprovel;
