// import React from 'react'
import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../../static/logopixel.png';static/logopixel.png';
import logo from '../../../static/logopixel.png';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {clearUserData} from '../../../Store/Actions/UserAction';
import {HiBellAlert} from 'react-icons/hi2';
import axios from '../../../axios'

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
    console.log(receivedMessages)
    const count = receivedMessages.length
    // const bellIconClasses = color({
    //   'red': count > 0, // Apply this class when count is greater than 0
    // });
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
    }
    return (
        <>
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
                        <ul className='flex gap-9'>
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
                            <div className=''>
                            <Link>
                                <li className='group relative px-3 py-2 text-sm font-medium text-white '>
                                    <HiBellAlert size={25}
                                                color={count > 0?"red":"white"} 

                                    
                                        onClick={
                                            () => setShowNotifications(!showNotifications)
                                        }/> {
                                    showNotifications &&  (
                                        <div className="absolute top-10 right-0 p-2 bg-white shadow-md w-60 rounded-md">
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
                                } </li>
                            </Link>


                            </div>
                          
                            {/* {count > 0 && (
                                <div className="text-center ">
                                  <span className="text-red-500 font-xs">{count} new messages</span>
                                </div>
                              )} */}


                        </ul>
                    </div>


                    {/* <div class=' hidden md:flex gap-6 flex items-center justify-center min-h-screen'>
            <div class="border w-fit rounded-xl m-5 shadow-sm">
                <button class="px-4 py-2 rounded-l-xl text-white m-0 bg-[#2d737a] hover:bg-red-600 transition" onClick={()=>navigate('/signin')}>Login</button>
                <i class="fa fa-user px-4 py-2 " aria-hidden="true"></i><span>{username}</span>
            </div>
        </div> */}
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


                    {/* <div className='hidden md:flex gap-6'>
                    <i className="fa fa-user fa-2x p-2 "></i>
                    <button className='px-7 py-2 rounded bg-[#32a8a2] text-white font-bold'>Login</button>
                </div> */}

                    <div className="md:hidden"
                        onClick={
                            () => setToggle(!toggle)
                    }>
                        {
                        toggle ? <i className="fa fa-times"></i> : <i className="fa fa-bars text-white"></i>
                    } </div>

                </div>
                <div className={
                    toggle ? 'absolute z-50 p-4 bg-white w-full px-8 md:hidden' : 'hidden'
                }>
                    <ul>
                        <li className='p-4 hover:bg-gray-100'
                            onClick={
                                () => navigate('/')
                        }>HOME</li>

                        <li className='p-4 hover:bg-gray-100'
                            onClick={
                                () => navigate('/course')
                        }>COURSES</li>
                        <li className='p-4 hover:bg-gray-100'>BLOGS</li>
                        <li className='p-4 hover:bg-gray-100'>COMMUNITIES</li>
                        <li className='p-4 hover:bg-gray-100'
                            onClick={
                                () => navigate('/profile')
                        }>PROFILE</li>
                        <li className='p-4 hover:bg-gray-100'>ABOUT US</li>

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
