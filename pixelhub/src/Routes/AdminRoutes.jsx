import React from 'react'
import {Route, Routes } from 'react-router-dom';
import Dashboard from '../Componets/Adminside/Dashboardadmin/Dashboard';
import Users from '../Componets/Adminside/Users/Users';
import Venderaprovel from '../Componets/Adminside/Vendoraprovel/Venderaprovel';
import Vendormanagement from '../Componets/Adminside/Vendoraprovel/Vendormanagement';
import Coursemanage from '../Componets/Adminside/Coursepages/Coursemanage';
import Pendingcourses from '../Componets/Adminside/Coursepages/Pendingcourses';
import Videos from '../Componets/Adminside/Coursepages/Videos';
import Courseadmindetail from '../Componets/Adminside/Coursepages/Courseadmindetail';
import Adminlogin from '../Componets/Adminside/Adminlogin/Adminlogin';
import Transaction from '../Componets/Adminside/Transactions/Transaction';

const AdminRoutes = () => {
  return (
    <div>
              <Routes>
              <Route exact path="/adminlogin" element={<Adminlogin />} />


              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route  path="/usermanagement" element={<Users/>} />
              <Route  path="/vendorrequest" element={<Venderaprovel/>} />
              <Route  path="/vendormanagement" element={<Vendormanagement/>} />
              <Route  path="/fullcourses" element={<Coursemanage/>} />
              <Route  path="/pendingcouses" element={<Pendingcourses/>} />
              <Route  path="/videosadmin/:courseId" element={<Videos/>} />
              <Route  path="/coursefulldetails/:courseId" element={<Courseadmindetail/>} />
              <Route  path="/transactions" element={<Transaction/>} />




              







              </Routes>


      
    </div>
  )
}

export default AdminRoutes
