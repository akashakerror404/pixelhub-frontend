import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequriedAuth() {
const { isAuthenticated, userId,role } = useSelector((state) => state.user);
    const location = useLocation();


  return (
    userId ? <Outlet state={{from:location}} />:
             <Navigate to="/signin" state={{ from: location.pathname }} replace />

  )
}

export default RequriedAuth




