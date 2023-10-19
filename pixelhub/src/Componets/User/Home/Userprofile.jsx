import React, { useState, useEffect } from 'react';
import Customenavbar from '../Navbar/Customenavbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsPencilSquare } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import axios from '../../../axios';
import { API_URL } from '../../Baseurl';

function Userprofile() {
    const { isAuthenticated, userId } = useSelector((state) => state.user);
    const [userImage, setUserImage] = useState(null);
    const [profile, setProfile] = useState({});
    const [editing, setEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    // const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
    
        // Create a FormData object to send the image data
        const formData = new FormData();
        formData.append('profile_image', selectedImage);
    
        // Send the image to the backend
        axios
            .put(`/update-profile-image/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart form-data
                },
            })
            .then((response) => {
                // Handle the response, e.g., update the user's profile with the new image
                setProfile(response.data);
            })
            .catch((error) => {
                console.error('Error updating profile image:', error);
            });
    };
    
    const handleEdit = () => {
        setEditing(true);
        setEditedUsername(profile.username);
        // setEditedEmail(profile.email);
        setEditedPhone(profile.phone);
    };

    const handleSave = () => {
        // Create a payload with the edited data
        const payload = {
            username: editedUsername,
            // email: editedEmail,
            phone: editedPhone,
        };
        
        console.log(payload)

        axios.put(`/profileedit/${userId}/`, payload)
            .then((response) => {
                setProfile(response.data);
                setEditing(false);
            })
            .catch((error) => {
                console.error('Error updating user profile:', error);
            });
    };

    useEffect(() => {
        axios.get(`/userprofile/${userId}/`)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user profile details:', error);
            });
    }, [editing]);

    return (
        <div>
            <Customenavbar />
            <div className="p-2">
                <div className="p-8 bg-white mt-24 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="relative">
                            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <div className="ml-32 mb-36 absolute">
                                    {userImage ? (
                                        <TiTick size={45} color="green" />
                                    ) : (
                                        <label htmlFor="imageInput">
                                            <BsPencilSquare size={25} />
                                        </label>
                                    )}
                                </div>
                                <input type="file" id="imageInput" accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange} />
                                {userImage || profile.profileimage ? (
                                    <img className="rounded-full w-48 h-48"
                                        src={userImage ? URL.createObjectURL(userImage) : `${API_URL}${profile.profileimage}`}
                                        alt="User" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
                    </div>
                    <div className="mt-20 text-center border-b pb-12">
                        {editing ? (
                            <div className="justify-center flex flex-col items-center shadow-md p-4">
                            <p className='text-red-500'>username</p>
                                <input type="text"
                                    value={editedUsername}
                                    onChange={(e) => setEditedUsername(e.target.value)}
                                    className="mb-2 shadow-sm rounded p-2" />
                               
                            <p className='text-red-500'>phonenumber</p>

                                <input type="text"
                                    value={editedPhone}
                                    onChange={(e) => setEditedPhone(e.target.value)}
                                    className="mb-2 shadow-sm rounded p-2" />
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-4xl font-medium text-gray-700">
                                    {profile.username}
                                    <span className="font-light text-gray-500"></span>
                                </h1>
                                <p className="font-light text-gray-600 mt-3">
                                    {profile.email}
                                </p>
                                <p className="font-light text-gray-600 mt-3">
                                    {profile.phone}
                                </p>
                            </div>
                        )}

                    {userId &&
                        <div className="mt-12 flex flex-col justify-center">
                            {editing ? (
                                <button className="text-indigo-500 py-2 px-4 font-medium mt-4" onClick={handleSave}>
                                    Save
                                </button>
                            ) : (
                                <button className="text-indigo-500 py-2 px-4 font-medium mt-4" onClick={handleEdit}>
                                    Edit
                                </button>
                            )}
                        </div>}
                    </div>
                    <div className="mt-12 flex flex-col justify-center">
                        <button className="text-indigo-500 py-2 px-4 font-medium mt-4" onClick={() => navigate('/enrollments')}>
                            My Enrollments
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userprofile;
