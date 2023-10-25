// import React from 'react'
import React, {useState, useEffect,useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../../static/logopixel.png';static/logopixel.png';
import logo from '../../../static/logopixel.png';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {clearUserData} from '../../../Store/Actions/UserAction';
import {HiBellAlert} from 'react-icons/hi2';
import axios from '../../../axios'
import beepSound from '../../../static/notification.mp3'; // Adjust the import path
import Permission from '../../../Permission';

function Vendornav() { // const { isAuthenticated, username, role } = useSelector((state) => state.user);

    const {isAuthenticated, username, userId, role} = useSelector((state) => state.user);
    console.log(userId)
    const [socket, setSocket] = useState(null);
    const roomName = `${userId}_${"admin"}`;
    console.log("room name", roomName)
    const [Dashdata, setDashdata] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    
    const playNotificationSound = () => {
        const audio = new Audio(beepSound);
        audio.play();
      };
    console.log(receivedMessages)
    const count = receivedMessages.length
    
    
    
    useEffect(() => {
        const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/note-chat/${roomName}/`);
        setSocket(newSocket);

        axios.get(`/vendorstudentcount/${userId}/`).then((response) => {
            setDashdata(response.data);
            console.log(response.data)
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });


        return() => { // Close the WebSocket connection when the component unmounts
            if (socket) {
                socket.close();
            }
        };
    }, []); // Include userId in the dependency array
    useEffect(() => {

        if (socket) {
            socket.onopen = () => {
                console.log("WebSocket connection opened");
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const message_get = data.message_content;

                // Update the state with the received message
                setReceivedMessages((prevMessages) => [
                    ...prevMessages,
                    message_get
                ]);
            if (Notification.permission=='granted'){
                playNotificationSound()
            }

            };
        }
    }, [socket]);


    const [showNotifications, setShowNotifications] = useState(false);


    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(clearUserData());
        console.log("logout")
        navigate('/signin'); // Adjust the URL as needed

    }

    

    return (
        <>

            <Permission onNewMessage={playNotificationSound}/>
            <div className='w-full h-[80px] bg-[#141B2D] border-b shadow fixed z-50'>
                <div className='md:max-w-[1240px]  max-w-[330px] w-full h-full flex justify-between items-center m-auto'>
                    {/* <h1 className='h-[25px] text-2xl text-green-500'>pixel hub</h1> */}
                    {/* <img className='h-8 w-auto' src={logo}> </img> */}
                    <div className="flex flex-shrink-0 ">
                        <img className="h-11 w-auto"
                            src={logo}
                            alt="Your Company"/>
                    </div>

                    <div className='hidden md:flex'>
                        <ul className='flex gap-6'>
                            <Link to="/vendor/dashboard">
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    DASH  BOARD
                                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                                </li>
                            </Link>


                            <Link to="/vendor/coursemanage">
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    UPLOAD CLASS
                                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                                </li>
                            </Link>
                            <Link to="/vendor/waitinglist">
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    WAITING LIST
                                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                                </li>
                            </Link>
                            <Link to="/vendor/runninglist">
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    RUNNIG CLASSES
                                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                                </li>
                            </Link>
                            <Link to="/vendor/chatbox">
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    CHAT BOX
                                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                                </li>
                            </Link>
                            <Link to="/vendor/payments">
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    PAYMENTS
                                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                                </li>
                            </Link>

                            <div class="relative"
                                onClick={
                                    () => setShowNotifications(!showNotifications)
                            }>
                                <svg class="w-8 h-8 text-teal-600 animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"/></svg>
                                <div class="px-1 bg-teal-500 rounded-full text-center text-white text-sm absolute -top-3 -end-2">
                                    {
                                    count > 0 && (
                                        <div className="text-center ">
                                            <span className="text-white font-xs">
                                                {count} </span>
                                        </div>
                                    )
                                }
                                    <div class="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
                                </div>

                            </div>
                            {
                            showNotifications && (

                                <div className="absolute top-20 right-72 p-2 bg-white shadow-md w-60 rounded-md">
                                    <ul className="list-none p-0 m-0">
                                        {
                                        receivedMessages.map((message, index) => (
                                            <li key={index}
                                                className="p-2 border-b border-gray-300 text-black">
                                                {message} </li>
                                        ))
                                    } </ul>


                                </div>
                            )
                        } </ul>
                    </div>


                    <button class="hidden md:flex relative inline-flex items-center justify-center p-2 px-4 py-1 overflow-hidden font-medium text-[#2d737a] text-sm transition duration-300 ease-out border-2 border-[#2d737a] rounded-full shadow-md group"
                        onClick={
                            () => {
                                if (username) {
                                    handleLogout();
                                } else {
                                    navigate('/signin');
                                }
                            }
                    }>
                        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2d737a] group-hover:translate-x-0 ease">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                            <span> {
                                username ? "Logout" : ""
                            }</span>
                        </span>

                        <span class="absolute flex items-center justify-center w-full h-full text-[#2d737a] text-sm transition-all duration-300 transform group-hover:translate-x-full ease">
                            {
                            username ? username : "Login"
                        } </span>
                        <span class="relative invisible">Button Text</span>
                    </button>
                        <div className='flex md:hidden gap-4'>

                    <div className='md:hidden '>
                        <div class="relative  "
                            onClick={
                                () => setShowNotifications(!showNotifications)
                        }>
                            <svg class="w-8 h-8 text-teal-600 animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"/></svg>
                            <div class="px-1 bg-teal-500 rounded-full text-center text-white text-sm absolute -top-3 -end-2">
                                {
                                count > 0 && (
                                    <div className="text-center ">
                                        <span className="text-white-500 font-xs">
                                            {count} </span>
                                    </div>
                                )
                            }
                                <div class="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-red-600 w-full h-full"></div>
                            </div>

                        </div>
                        {
                        showNotifications && (

                            <div className="absolute top-20 right-10 p-2 bg-white shadow-md w-60 rounded-md">
                                <ul className="list-none p-0 m-0">
                                    {
                                    receivedMessages.map((message, index) => (
                                        <li key={index}
                                            className="p-2 border-b border-gray-300 text-black">
                                            {message} </li>
                                    ))
                                } </ul>


                            </div>
                        )
                    } </div>

                    <div className="md:hidden"
                        onClick={
                            () => setToggle(!toggle)
                    }>
                        {
                        toggle ? <i className="fa fa-times"></i> : <i className="fa fa-bars text-white"></i>
                    } </div>
                        </div>


                </div>
                <div className={
                    toggle ? 'absolute z-50 p-4 bg-[#1F2A40] w-full px-8 md:hidden' : 'hidden'
                }>
                    <ul>
                    <Link to="/vendor/dashboard"> <li className='p-4 text-white hover:bg-gray-100 '>HOME</li>  </Link>

                    <Link to="/vendor/coursemanage"> <li className='p-4 text-white hover:bg-gray-100'>UPLOAD CLASS</li></Link>

                    <Link to="/vendor/waitinglist">  <li className='p-4 text-white hover:bg-gray-100'> WAITING LIST</li></Link>
                    <Link to="/vendor/runninglist"><li className='p-4 text-white hover:bg-gray-100'>RUNNING CLASS</li></Link>
                    <Link to="/vendor/chatbox">   <li className='p-4  text-white hover:bg-gray-100'> CHAT BOX</li></Link>
                    <Link to="/vendor/payments"> <li className='p-4  text-white hover:bg-gray-100'>PAYMENTS</li></Link>

                        <div className='flex flex-col my-4 gap-4'>
                            <button className='px-7 py-2 rounded bg-[#2d737a] text-white font-bold shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'
                                onClick={
                                    () => navigate('/signup')
                            }>Login</button>
                        </div>
                    </ul>
                </div>

            </div>
            <div className='w-full h-[80px] bg-white border-b shadow  '></div>
        </>
    )
}

export default Vendornav
