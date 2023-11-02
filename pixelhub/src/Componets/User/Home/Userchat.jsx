import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from '../../../axios';
import Customenavbar from '../Navbar/Customenavbar'
import {useLocation} from 'react-router-dom';
import '../Home/css/chat.css'
import {AiOutlineSend} from 'react-icons/ai';
import EmojiPicker from 'emoji-picker-react';

function Userchat() { // const { vendorId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vendorId = queryParams.get('vendorid');
    const vendorname = queryParams.get('vendorname');


    const [docname, setDocname] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [userData, setUserData] = useState([]);
    const messageContainerRef = useRef(null);
    const [docImage, setDocImage] = useState(null);
    const {userId, username} = useSelector((state) => state.user);
    const roomName = `${vendorId}_${userId}`;
    console.log("room name", roomName)



    // sudeesh.
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      };
      useEffect(() => {
        // Scroll to the bottom of the message container when messages change
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // sudessh



    // Separate state for WebSocket messages
    const [websocketMessages, setWebsocketMessages] = useState([]);


    useEffect(() => {
        const newSocket = new WebSocket(`wss://www.pixel-hub.online/ws/chat/${roomName}/`);
        setSocket(newSocket);

        return() => {
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
                console.log("messaage recived")
                const data = JSON.parse(event.data);
                const message_get = data.message_content;
                setWebsocketMessages((prevMessages) => [
                    ...prevMessages,
                    data
                ]);
            };
        }

        const sendMessage = () => {
            const messageToSend = {
                message_content: messageInput
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
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data) {
                    setMessages(response.data);
                    

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSendMessage = async () => {
        if (messageInput.trim() === '') 
            return;
        

        try {
            const newMessage = {
                sender: userId,
                receiver: vendorId,
                message_content: messageInput
            };
            const response = await axios.post('/chat/create/', newMessage, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                if (socket) {
                    socket.send(JSON.stringify(newMessage));
                }
                setMessageInput('');
                if (messageContainerRef.current) {
                    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Update messages when WebSocket messages are received
    useEffect(() => {
        setMessages((prevMessages) => [
            ...prevMessages,
            ...websocketMessages
        ]);
    }, [websocketMessages]);



    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // const [chosenEmoji, setChosenEmoji] = useState(null);


    // const onEmojiClick = (event, emojiObject) => {
    //     setMessageInput(emojiObject);
    // };


    return (
        <div>
            <Customenavbar/>
            <div className='flex flex-col '>
                <div className="py-2 px-3 bg-[#e4f2ee] flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            <img className="w-10 h-10 rounded-full" src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png" alt="User Profile"/>
                        </div>
                        <div className="ml-4">
                            <p className="text-grey-darkest">
                                {vendorname} </p>
                            <p className="text-grey-darker text-xs ">
                                active yesterday
                            </p>
                        </div>
                    </div>


                </div>

                <div className=" bg-[#dad3cc]  flex  flex-row justify-center items-center ">


                    <div className="flex-1  bg-[#dad3cc]   absolute mt-12 ">
                        <div className="py-1 ">


                            <div className="flex justify-center  ">
                                <div className="rounded py-2 px-1 bg-[#FCF4CB] ">
                                    <p className="md:text-xs text-[8px] ">
                                        Messages to this chat and calls are now secured with end-to-end encryption.
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                <div className="flex flex-col bg-[#dad3cc] md:h-[610px] h-[460px] p-4 overflow-y-auto scrollbar-hide " ref={messageContainerRef} >
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
                } </div>
                <div className="bg-[#dad3cc] p-4  flex   ">
                {/* <span
                        className='mt-2 text-2xl'
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle emoji picker
                    >😎</span>

                    {showEmojiPicker && (
                        <EmojiPicker onEmojiClick={onEmojiClick} /> // Pass the emoji selection handler
                    )} */}

                    <input className="border-none rounded-full p-2 w-full" type="text" placeholder="Type your message..."
                    
                        value={messageInput}
                        onChange={
                            (e) => setMessageInput(e.target.value)
                        }
                        onKeyDown={
                            (e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }
                        }/>
                    <button type="button" class=" font-medium rounded-full text-sm p-3 text-center inline-flex items-center mr-2 "
                        onClick={handleSendMessage}>
                        <AiOutlineSend color='green'
                            size={20}/>

                    </button>
                </div>


            </div>


        </div>
    );
}

export default Userchat;
