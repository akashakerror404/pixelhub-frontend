// import React from 'react'
import React,{useState} from 'react'
import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../../static/logopixel.png';
import logo from '../../../static/logopixel.png';
import { useNavigate,Link} from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { clearUserData } from '../../../Store/Actions/UserAction';
import axios from '../../../axios'

function Adminnavbar() {
  
  
    const { isAuthenticated, username, role } = useSelector((state) => state.user);

    const [toggle,setToggle] =useState(false)
    const dispatch = useDispatch();

    const navigate=useNavigate();
    // const handleLogout = () => {
    
    //   dispatch(clearUserData());
    //   console.log("logout");
    
    //   navigate('/admin/adminlogin');
    // }




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
          axios.defaults.headers.common["Authorization"] = null;
          navigate('/admin/adminlogin');
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
    <div className='w-full h-[80px] bg-[#141B2D] border-b shadow fixed z-50'>
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
    <Link to="/admin/dashboard"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            DASHBOARD
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>
        <Link to="/admin/usermanagement"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            USERS
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>
        <Link to="/admin/vendormanagement"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            VENDERS
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>
        <Link to="/admin/vendorrequest"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            VENDER REQUEST
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>
        <Link to="/admin/fullcourses"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            ALL COURSES
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>
        <Link to="/admin/pendingcouses"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            PENDING COURSES
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>

        <Link to="/admin/transactions"><li className='group relative px-3 py-2 text-sm font-medium text-white '>
            TRANSACTIONS
            <div className='absolute inset-x-0 bottom-0 h-1 bg-[#FF0000] transform scale-x-0 origin-left transition-transform group-hover:scale-x-100'></div>
        </li></Link>
     
     
    
    </ul>
</div>

       

               
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




        
        






        
        

             
           
            <div className="md:hidden" onClick={()=>setToggle(!toggle)}>
               {toggle ? <i className="fa fa-times"></i> : <i className="fa fa-bars text-white"></i>
 }
            </div>

        </div>
        <div className={toggle ? 'absolute z-50 p-4 bg-white w-full px-8 md:hidden' :'hidden'}>
            <ul>
            <Link to="/admin/dashboard"><li className='p-4 hover:bg-gray-100'>DASHBOARD</li></Link>

            <Link to="/admin/usermanagement"><li className='p-4 hover:bg-gray-100'>USERMANAGEMENT</li></Link>
            <Link to="/admin/vendormanagement"><li className='p-4 hover:bg-gray-100'>VENDOR</li></Link>
            <Link to="/admin/vendorrequest"><li className='p-4 hover:bg-gray-100'>VENDOR REQUESTS</li></Link>
            <Link to="/admin/fullcourses"><li className='p-4 hover:bg-gray-100'>ALL COURSE</li></Link>
            <Link to="/admin/pendingcouses"><li className='p-4 hover:bg-gray-100'>OENDING COURSE</li></Link>
            <Link to="/admin/transactions"><li className='p-4 hover:bg-gray-100'>TRANSACTIONS</li></Link>


                
                <div className='flex flex-col my-4 gap-4'>
                <button className='px-7 py-2 rounded bg-[#2d737a] text-white font-bold shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]' onClick={()=>navigate('/signup')}>Login</button>
                </div>
            </ul>
        </div>
      
    </div>
        <div className='w-full h-[80px] bg-white border-b shadow  '>
                </div>
                </>
  )
}

export default Adminnavbar
