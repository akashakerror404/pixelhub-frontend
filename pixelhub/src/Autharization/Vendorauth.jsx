import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";

function Vendorauth() {
    const { isAuthenticated, userId,role } = useSelector((state) => state.user);
    const location = useLocation();
  return (
    role === 300 ? <Outlet state={{from:location}} />:
    <Navigate to="/signin" state={{ from: location.pathname }} replace />

)
}

export default Vendorauth
