import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../../axios';
import Vendornav from '../Vendornavbar/Vendornav';
function Chatdetails({id}) {
    const vendorId=id
    console.log("vendorId",vendorId)


    const [docname, setDocname] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [userData, setUserData] = useState([]);
    const messageContainerRef = useRef(null);
    const [docImage, setDocImage] = useState(null);
    const { userId, username } = useSelector((state) => state.user);
    const roomName = `${userId}_${vendorId}`;
    console.log("room name",roomName)

    // const [isToggled, setIsToggled] = useState(false);

    // useEffect(() => {
    //     // Function to toggle the state between true and false
    //     const toggleStateEverySecond = () => {
    //         setIsToggled((prevToggled) => !prevToggled);
    //     };

    //     // Set an interval to call the toggle function every second (1000 milliseconds)
    //     const intervalId = setInterval(toggleStateEverySecond, 1000);

    //     // Clear the interval when the component unmounts
    //     return () => {
    //         if (intervalId) {
    //             clearInterval(intervalId);
    //         }
    //     };
    // }, []);


    // Separate state for WebSocket messages
    const [websocketMessages, setWebsocketMessages] = useState([]);

    useEffect(() => {
        const newSocket = new WebSocket(`wss://www.pixel-hub.online/ws/chat/${roomName}/`);
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, [roomName]);

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log("WebSocket connection opened");
            };

            socket.onmessage = (event) => {
                console.log("here mesage")
                const data = JSON.parse(event.data);
                const message_get = data.message_content;
                setWebsocketMessages((prevMessages) => [...prevMessages, data]);
            };
        }

        const sendMessage = () => {
            const messageToSend = {
                message_content: messageInput,
            };
            socket.send(JSON.stringify(messageToSend));
        };

        if (socket && socket.readyState === WebSocket.OPEN) {
            sendMessage();
        }
    }, [socket]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/chat/chat/${userId}/${vendorId}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data) {
                    setMessages(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [vendorId]);

    const handleSendMessage = async () => {
        if (messageInput.trim() === '') return;
        try {
            const newMessage = {
                sender: userId,
                receiver: vendorId,
                message_content: messageInput,
            };
            const response = await axios.post('/chat/create/', newMessage, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data) {
                if (socket) {
                    socket.send(JSON.stringify(newMessage));
                }
                setMessageInput('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Update messages when WebSocket messages are received
    useEffect(() => {
        setMessages((prevMessages) => [...prevMessages, ...websocketMessages]);
    }, [websocketMessages]);



    




  return (
    <div>
                    <div className="flex  flex-col md:h-[450px] h-[395px] p-4 overflow-y-auto scrollbar-hide">
                    {
                    messages.map((message, index) => (
                        <div key={index}
                            className={
                                `flex flex-col mb-4 ${
                                    message.sender === userId ? 'items-end' : 'items-start'
                                }`
                        }>
                            <div className={
                                `rounded-lg p-2 max-w-md ${
                                    message.sender === userId ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                                }`
                            }>
                                {
                                message.message_content
                            } </div>
                            <div className="text-xs text-gray-500 mt-1 ml-2">
                                {
                                new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            } </div>
                        </div>
                    ))
                }

             
                
                </div>
                <div className=" md:p-4  flex   ">
                    <input className="border rounded-full p-2 w-full bg-gray-100" type="text" placeholder="Type your message..."
                        value={messageInput}
                        onChange={
                            (e) => setMessageInput(e.target.value)
                        }/>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm p-3 text-center inline-flex items-center mr-2 "
                        onClick={handleSendMessage}>
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
        </div>
  )
}

export default Chatdetails
