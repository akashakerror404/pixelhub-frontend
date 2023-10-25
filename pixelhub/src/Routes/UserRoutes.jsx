import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Home from "./../Componets/User/Home/Home";
import Signup from '../Componets/User/Signup/Signup';
import Userprofile from '../Componets/User/Home/Userprofile';
import Coursepage from '../Componets/User/Home/Coursepage';
import Coursedeatils from '../Componets/User/Home/Coursedeatils';
import Enrollments from '../Componets/User/Home/Enrollments';
import Videoclass from '../Componets/User/Home/Videoclass';
import About from '../Componets/User/Home/About';
import Signin from '../Componets/User/Home/Signin';
import Otp from '../Componets/User/Home/Otp';
import Userchat from '../Componets/User/Home/Userchat';
import Blogpage from '../Componets/User/Blogs/Blogpage';
import Blogdetailpage from '../Componets/User/Blogs/Blogdetailpage';
import Createblog from '../Componets/User/Blogs/Createblog';
import RequriedAuth from '../Autharization/RequriedAuth';
import Paymentsucess from '../Componets/User/Home/Paymentsucess';
import Forgotpassword from '../Componets/User/Home/Forgotpassword';
import Newpasswrod from '../Componets/User/Home/Newpasswrod';



const UserRoutes = () => {
  return (
    <div>
      <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/forgotpassword" element={<Forgotpassword />} />

                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/otpconfirmation" element={<Otp/>} />
                <Route exact path="/paymentsucess" element={<Paymentsucess />} />
                <Route exact path="/resetpassword/:userid" element={<Newpasswrod />} />


                

                <Route exact path="/course" element={<Coursepage />} />
                <Route exact path="/coursedetail/:courseId" element={<Coursedeatils />} />
                {/* <Route exact path="profile" element={<Userprofile />} /> */}
                <Route exact path="/video" element={<Videoclass />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/blogs" element={<Blogpage />} />
                <Route path="/blogdetails/:id" element={<Blogdetailpage />} />

                
                <Route element={<RequriedAuth />}> 
                <Route exact path="/enrollments" element={<Enrollments />} />
                <Route exact path="/profile" element={<Userprofile />} />
                <Route exact path="/createblog" element={<Createblog />} />
                <Route exact path="/userchat" element={<Userchat />} />




                
                
                 </Route>

                
            
          </Routes>
    </div>
  )
}

export default UserRoutes
