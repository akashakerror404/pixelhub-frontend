import React,{useState} from 'react'
import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../../static/logopixel.png';
import logo from '../../../static/logopixel.png';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { clearUserData } from '../../../Store/Actions/UserAction';
import axios from '../../../axios'

function Customenavbar() {
    const { isAuthenticated, username, role } = useSelector((state) => state.user);

    const [toggle,setToggle] =useState(false)
    const dispatch = useDispatch();

    const navigate=useNavigate();




    const handleLogout = async () => {
      try {
        const response = await axios.post(
          '/logout',
          { refresh_token: localStorage.getItem("refresh_token") },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 205) {
          // Check for the appropriate status code
  
          dispatch(clearUserData());
          localStorage.clear();

          axios.defaults.headers.common["Authorization"] = null;
          navigate('/signin');
          console.log("success");
        } else {
          console.log("Logout request was not successful");
        }
      } catch (e) {
        console.log("logout not working", e);
      }
    };
  
  return (
    <>
    <div className='w-full h-[80px] bg-white border-b shadow fixed z-50'>
        <div className='md:max-w-[1240px]  max-w-[330px] w-full h-full flex justify-between items-center m-auto'>
            {/* <h1 className='h-[25px] text-2xl text-green-500'>pixel hub</h1> */}
            {/* <img className='h-8 w-auto' src={logo}> </img> */}
            <div className="flex flex-shrink-0 ">
                <img
                  className="h-11 w-auto"
                  src={logo}
                  alt="Your Company"
                />
              </div>
           
              <div className='hidden md:flex'>
                <ul className='flex gap-9'>
                    <li className='group relative px-3 py-2 text-sm font-medium' onClick={()=>navigate('/')}>
                    HOME 
                    <div className='absolute inset-x-0 bottom-0 h-1 bg-[#00A9B7] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    <li className='group relative px-3 py-2 text-sm font-medium'onClick={()=>navigate('/course')}>
                    COURSES
                    <div className='absolute inset-x-0 bottom-0 h-1  bg-[#00A9B7] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
               
                    <li className='group relative px-3 py-2 text-sm font-medium' onClick={()=>navigate('/about')}>
                    ABOUT US
                    <div className='absolute inset-x-0 bottom-0 h-1  bg-[#00A9B7] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    <li className='group relative px-3 py-2 text-sm font-medium' onClick={()=>navigate('/blogs')}>
                    BLOGS
                    <div className='absolute inset-x-0 bottom-0 h-1  bg-[#00A9B7] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>
                    {username&&
                    <li className='group relative px-3 py-2 text-sm font-medium' onClick={()=>navigate('/profile')}>
                    PROFILE
                    <div className='absolute inset-x-0 bottom-0 h-1  bg-[#00A9B7] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
                    </li>}
                    
                </ul>
                </div>
       

                {/* <div class=' hidden md:flex gap-6 flex items-center justify-center min-h-screen'>
            <div class="border w-fit rounded-xl m-5 shadow-sm">
                <button class="px-4 py-2 rounded-l-xl text-white m-0 bg-[#2d737a] hover:bg-red-600 transition" onClick={()=>navigate('/signin')}>Login</button>
                <i class="fa fa-user px-4 py-2 " aria-hidden="true"></i><span>{username}</span>
            </div>
        </div> */}
<button
  class="hidden md:flex relative inline-flex items-center justify-center p-2 px-4 py-1 overflow-hidden font-medium text-[#2d737a] text-sm transition duration-300 ease-out border-2 border-[#2d737a] rounded-full shadow-md group"
  onClick={() => {
    if (username) {
      handleLogout();
    } else {
      navigate('/signin');
    }
  }}
>
  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2d737a] group-hover:translate-x-0 ease">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg><span> {username ? "Logout" : ""}</span>
  </span>

  <span class="absolute flex items-center justify-center w-full h-full text-[#2d737a] text-sm transition-all duration-300 transform group-hover:translate-x-full ease">
    {username ? username : "Login"}
  </span>
  <span class="relative invisible">Button Text</span>
</button>




        
        






        
        

                {/* <div className='hidden md:flex gap-6'>
                    <i className="fa fa-user fa-2x p-2 "></i>
                    <button className='px-7 py-2 rounded bg-[#32a8a2] text-white font-bold'>Login</button>
                </div> */}
           
            <div className="md:hidden" onClick={()=>setToggle(!toggle)}>
               {toggle ? <i className="fa fa-times"></i> : <i  className="fa fa-bars"></i> }
            </div>

        </div>
        <div className={toggle ? 'absolute z-50 p-4 bg-white w-full px-8 md:hidden' :'hidden'}>
            <ul>
                <li className='p-4 hover:bg-gray-100'  onClick={()=>navigate('/')}>HOME</li>

                <li className='p-4 hover:bg-gray-100'onClick={()=>navigate('/course')} >COURSES</li>
                <li className='p-4 hover:bg-gray-100'onClick={()=>navigate('/about')}>ABOUT</li>
                <li className='p-4 hover:bg-gray-100'onClick={()=>navigate('/blogs')}>BLOGS</li>
                {username&&<li className='p-4 hover:bg-gray-100'onClick={()=>navigate('/profile')}>PROFILE</li>}
                
                <div className='flex flex-col my-4 gap-4'>
                <button
                  className='px-7 py-2 rounded bg-[#2d737a] text-white font-bold shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'
                  onClick={() => {
                    if (username) {
                      handleLogout();
                    } else {
                      navigate('/signin');
                    }
                  }}
                >
                  {username ? 'Logout' : 'Login'}
                </button>
              </div>

            </ul>
        </div>
      
    </div>
        <div className='w-full h-[80px] bg-white border-b shadow  '>
                </div>
                </>

  )
}

export default Customenavbar
