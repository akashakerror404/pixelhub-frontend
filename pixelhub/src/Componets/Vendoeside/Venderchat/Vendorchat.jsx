import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import Vendornav from '../Vendornavbar/Vendornav';
import { useNavigate } from 'react-router';
import Chatdetails from './Chatdetails';
import { API_URL } from '../../Baseurl';
import { AiFillWechat } from 'react-icons/ai';

function Vendorchat() {
    const [chattedUsers, setChattedUsers] = useState([]);
    const { userId, username } = useSelector((state) => state.user);
    const [selectedChat, setSelectedChat] = useState({
        id: null,
        username: "",
        profileimage: "",
    });
    const [showImagePopup, setShowImagePopup] = useState(false); // State for image pop-up
    const popUpRef = useRef(null); // Reference to the pop-up div
    const navigate = useNavigate();

    const vendor_id = userId;

    const handleImageClick = () => {
        setShowImagePopup(true); // Open the image pop-up when the user's image is clicked
    };

    const closeImagePopup = () => {
        setShowImagePopup(false); // Close the image pop-up
    };

    useEffect(() => {
        // Make a GET request to fetch messages
        axios
            .get(`/chat/vendor-chat/${vendor_id}/`) // Replace user_id with the actual user ID
            .then((response) => {
                setChattedUsers(response.data);
                console.log(response.data);
                console.log(response.data.sender);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }, []); // Include dependencies as needed

    // Add a click event listener to close the pop-up when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popUpRef.current && !popUpRef.current.contains(e.target)) {
                setShowImagePopup(false);
            }
        };

        if (showImagePopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showImagePopup]);

    return (
        <div>
            <Vendornav />
            <div>
                <div className="md:container mx-auto md:mt-[20px] ">
                    <div className="w-full  ">
                        <div className="flex rounded shadow-lg md:h-[630px] h-[580px]">
                            {selectedChat ? (
                                <div className=' hidden md:flex'>
                                    <div className="w-[250px]  border flex flex-col">
                                        <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
                                            <div className='py-2 flex justify between w-full'>
                                                <div>
                                                    <p className='font-bold mt-2'>Chats</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#e4f2ee]  flex-1 overflow-auto">
                                            {chattedUsers.map((user) => (
                                                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                                    <div>
                                                        <img
                                                            className="h-12 w-12 rounded-full"
                                                            src={`${API_URL}${user.profileimage}`}
                                                            alt="Chat User"
                                                            onClick={handleImageClick} // Open the image pop-up when clicked
                                                        />
                                                    </div>
                                                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                        <div key={user.id} className="flex items-bottom justify-between">
                                                            <p
                                                                className="text-grey-darkest"
                                                                onClick={() =>
                                                                    setSelectedChat({
                                                                        id: user.id,
                                                                        username: user.username,
                                                                        profileimage: user.profileimage,
                                                                    })
                                                                }
                                                            >
                                                                {user.username}
                                                            </p>
                                                            <p className="text-xs text-grey-darkest">
                                                                12:45 pm
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full  border flex flex-col">
                                    <div className="py-2 px-3 bg-[#36c49c] w-full flex flex-row justify-between items-center">
                                        <div className='py-2 flex justify-between w-full'>
                                            <div>
                                                <p className='font-bold mt-2'>Chats</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white flex-1  overflow-auto">
                                        {chattedUsers.map((user) => (
                                            <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                                <div>
                                                    <img
                                                        className="h-12 w-12 rounded-full"
                                                        src={`${API_URL}${user.profileimage}`}
                                                        alt="Chat User"
                                                        onClick={handleImageClick} // Open the image pop-up when clicked
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                    <div key={user.id} className="flex items-bottom justify-between">
                                                        <p
                                                            className="text-grey-darkest"
                                                            onClick={() =>
                                                                setSelectedChat({
                                                                    id: user.id,
                                                                    username: user.username,
                                                                    profileimage: user.profileimage,
                                                                })
                                                            }
                                                        >
                                                            {user.username}
                                                        </p>
                                                        <p className="text-xs text-grey-darkest">
                                                            12:45 pm
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedChat ? (
                                <div className="w-full border  flex flex-col">
                                    <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={`${API_URL}${selectedChat && selectedChat.profileimage}`}
                                                    alt="User Profile"
                                                    onClick={handleImageClick} // Open the image pop-up when clicked
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-grey-darkest">
                                                    {selectedChat.username}
                                                </p>
                                                <p className="text-grey-darker text-xs mt-1">
                                                    last seen 10:14 am
                                                </p>
                                            </div>
                                        </div>
                                        <div className='md:hidden flex'>
                                            <AiFillWechat size={20} onClick={() => setSelectedChat(false)} />
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-auto md:h-[450px] h-[450px] p-4">
                                        <div className="py-1" ref={popUpRef}>
                                            <div className="flex justify-center">
                                                <div className="rounded py-2 px-4 bg-[#FCF4Cf]">
                                                    <p className="text-xs">
                                                        Messages to this chat and calls are now secured with end-to-end encryption.
                                                    </p>
                                                </div>
                                            </div>
                                            {selectedChat && <Chatdetails id={selectedChat.id} />}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {/* Image pop-up */}
            {showImagePopup && (
              <div>

                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 ">
                <span className='text-gray-500 text-2xl  absolute mb-56 ml-72 rounded-full w-8 h-8 ' style={{cursor:'pointer'}} onClick={closeImagePopup}> x</span>

                    <div className="bg-white rounded-full w-64 h-64 items-center justify-center ">
                        <img className='rounded-full  w-64 h-64'
                            src={`${API_URL}${selectedChat && selectedChat.profileimage}`}
                            alt="User Profile"
                            onClick={closeImagePopup} // Close the image pop-up when clicked
                        />
                    </div>
                </div>
                </div>

            )}
        </div>
    );
}

export default Vendorchat;
