import React from 'react'
import Coursemanage from '../Componets/Vendoeside/Coursepages/Coursemanage'
import { Route, Routes } from 'react-router-dom';
import Addcourse from '../Componets/Vendoeside/Coursepages/Addcourse';
import Videos from '../Componets/Vendoeside/Coursepages/Video';
import Vendorsignup from '../Componets/Vendoeside/Vendorsignup/Vendorsignup';
import Addvideos from '../Componets/Vendoeside/Coursepages/Addvideos';
import Vendorsucces from '../Componets/Vendoeside/Vendorsignup/Vendorsucces';
import Coursedetailview from '../Componets/Vendoeside/Coursepages/Coursedetailview';
import Editcource from '../Componets/Vendoeside/Coursepages/Editcource';
import Waitingcourse from '../Componets/Vendoeside/Coursepages/Waitingcourse';
import Runnigcources from '../Componets/Vendoeside/Coursepages/Runnigcources';
import Vendorchat from '../Componets/Vendoeside/Venderchat/Vendorchat';
import Payments from '../Componets/Vendoeside/Transactions/Payments';
import Vendordash from '../Componets/Vendoeside/Vendordash/Vendordash';
import Adminnotofication from '../Componets/Vendoeside/Vendornavbar/Adminnotofication';

function VendorRoute() {
  return (
    <div>
        <Routes>
        <Route  path="/vendorsignup" element={<Vendorsignup />} />
        <Route  path="/vendorsuccesfull" element={<Vendorsucces />} />



        <Route  path="/coursemanage" element={<Coursemanage />} />
        <Route path="/addcourse" element={<Addcourse/>} />
        <Route path="/videos/:courseId" element={<Videos />} />
        <Route path="/addvideos/:courseId" element={<Addvideos/>} />
        <Route  path="/coursefulldetails/:courseId" element={<Coursedetailview/>} />
        <Route  path="/edit_course/:courseId" element={<Editcource/>} />
        <Route  path="/waitinglist" element={<Waitingcourse />} />
        <Route  path="/runninglist" element={<Runnigcources />} />
        <Route  path="/chatbox" element={<Vendorchat />} />
        <Route  path="/payments" element={<Payments />} />
        <Route  path="/dashboard" element={<Vendordash/>} />
        <Route  path="/notofications" element={<Adminnotofication/>} />





        


        
        


        </Routes>


      
    </div>
  )
}

export default VendorRoute
