import React, {useState} from 'react';
import Customenavbar from '../Navbar/Customenavbar';
import axios from '../../../axios';
import {useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import earth from '../../../Animations/earth.json';
import Lottie from 'lottie-react'


function Createblog() {
    const navigate = useNavigate();

    const {userId} = useSelector((state) => state.user);
    console.log(userId)

    const [blogData, setBlogData] = useState({headline: '', content: '', image: null});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setBlogData({
            ...blogData,
            [name]: value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBlogData({
                ...blogData,
                image: file
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is missing or null. Make sure the user is authenticated.');
            return;
        }

        const formData = new FormData();
        formData.append('user', userId);
        formData.append('headline', blogData.headline);
        formData.append('content', blogData.content);

        if (blogData.image) {
            formData.append('image', blogData.image);

            try {
                const response = await axios.post('/create-blog', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201) {
                    console.log('Blog created successfully');
                    navigate('/blogs');

                }
            } catch (error) {
                console.error('Error creating blog:', error);
            }
        } else {
            console.error('Please select an image for your blog.');
        }
    };

    return (
        <div>
            <Customenavbar/>
            <div class="flex mb-4">
                <div class="w-1/2 bg-gray-400 h-12"></div>
                <div class="w-1/2 bg-gray-500 h-[250px]">
                <Lottie animationData={earth} />


                </div>
                </div>
            <div className="md:p-6 p-4 bg-white text-black">
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-sans leading-7 text-black">Create a Blog</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="headline" className="block text-sm font-medium leading-6 text-black">
                                    Headline
                                </label>
                                <div className="mt-2">
                                    <input type="text" name="headline" id="headline" className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                                        onChange={handleInputChange}
                                        value={
                                            blogData.headline
                                        }/>
                                </div>
                                
                            </div>
                           




                            <div className="sm:col-span-6">
                                <label htmlFor="content" className="block text-sm font-medium leading-6 text-black">
                                    Content
                                </label>
                                <div className="mt-2">
                                    <textarea id="content" name="content"
                                        rows={6}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                                        onChange={handleInputChange}
                                        value={
                                            blogData.content
                                        }/>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="image" className="block text-sm font-medium leading-6 text-black">
                                    Blog Image
                                </label>
                                <div className="mt-2 flex justify-center">
                                    {
                                    blogData.image && (
                                        <img id="image-preview"
                                            src={
                                                URL.createObjectURL(blogData.image)
                                            }
                                            alt="Image Preview"
                                            className="mx-auto h-60 w-96 mb-4"/>
                                    )
                                }
                                    <div className="text-sm leading-6 text-black">
                                        <label htmlFor="blog-image" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Upload an Image</span>
                                            <input id="blog-image" name="image" type="file" className="sr-only"
                                                onChange={handleImageChange}/>
                                        </label>
                                        <p className="text-xs leading-5 text-black">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-black">
                            Cancel
                        </button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Createblog;
