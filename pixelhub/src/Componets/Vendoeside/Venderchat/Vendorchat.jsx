import React, { useState, useEffect } from 'react';
import axios from '../../../axios';
import { useSelector } from 'react-redux';
import Vendornav from '../Vendornavbar/Vendornav'
import { useNavigate } from 'react-router';
import Chatdetails from './Chatdetails';
import { API_URL } from '../../Baseurl';

function Vendorchat() {
    const [chattedUsers, setChattedUsers] = useState([]);
    const { userId, username } = useSelector((state) => state.user);
    const[selectedChat,setSelectedChat] = useState(null)
    const [socket, setSocket] = useState(null);

    console.log("This is",chattedUsers)


    const navigate = useNavigate();

    const vendor_id=userId







    useEffect(() => {
        // Make a GET request to fetch messages
        axios.get(`/chat/vendor-chat/${vendor_id}/`)  // Replace user_id with the actual user ID
            .then((response) => {
                setChattedUsers(response.data);
                console.log(response.data);
                console.log(response.data.sender)
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
                    });
            }, []);  // Include dependencies as needed

    return (
        <div>
        <Vendornav/>
        <div>
      <div className="w-full h-32 bg-[#449388]" ></div>

      <div className="container mx-auto mt-[-128px] ">
        <div className="py-6 w-full h-screen">
          <div className="flex   rounded shadow-lg h-full">
            
            <div className="w-full  border flex flex-col">
              <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
                <div className='py-2 flex justify-between w-full'>
                    <div>
                    <p className='font-bold mt-2'>Chats</p>
                    </div>
                 
                 </div>
              </div>

             

              <div className="bg-white flex-1 overflow-auto">
           
                  {chattedUsers.map((user) => (
                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                  <div>
                  <img className="h-12 w-12 rounded-full" src={`${API_URL}${user.profileimage} `}alt="Chat User" />

                    {/* <img className="h-12 w-12 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="Chat User" /> */}
                  </div>
                  <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div key={user.id} className="flex items-bottom justify-between">
                      <p className="text-grey-darkest" onClick={()=>setSelectedChat(user.id) } >
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

            {selectedChat ? (
  <div className="w-full border flex flex-col">
    <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
          <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="User Profile" />
        </div>
        <div className="ml-4">
          <p className="text-grey-darkest">
            {selectedChat}
          </p>
          <p className="text-grey-darker text-xs mt-1">
            last seen 10:14 am
          </p>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-auto bg-[#dad3cc] p-4">
      <div className="py-1">
        <div className="flex justify-center">
          <div className="rounded py-2 px-4 bg-[#FCF4CB]">
            <p className="text-xs">
              Messages to this chat and calls are now secured with end-to-end encryption.
            </p>
          </div>
        </div>
        {selectedChat && <Chatdetails id={selectedChat} />}
      </div>
    </div>
  </div>
) : null}
          </div>
        </div>
      </div>
    </div>

            
         
        </div>
    );
}

export default Vendorchat;
