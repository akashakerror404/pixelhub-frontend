import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";
function Adminauth() {
    const { isAuthenticated, userId,role } = useSelector((state) => state.user);
    const location = useLocation();
  return (
    role === 400 ? <Outlet state={{from:location}} />:
    <Navigate to="/admin/adminlogin" state={{ from: location.pathname }} replace />

)
}

export default Adminauth
