import { useState } from 'react'

import Home from './Componets/User/Home/Home'
import './App.css'
import Signin from './Componets/User/Home/Signin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes';
import VendorRoute from './Routes/VendorRoute';



function App() {
  return (
    <>
      {/* <Customenavbar /> */}
    
      <Router>
        <div className="App">
          
          <Routes>
            <Route path="/*" element={<UserRoutes/>} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/vendor/*" element={<VendorRoute />} />

          </Routes>
        </div>
      </Router>       
     
    </>
  );
}

export default App;

