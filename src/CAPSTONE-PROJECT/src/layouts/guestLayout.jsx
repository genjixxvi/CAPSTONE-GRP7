import { Navigate, Outlet } from 'react-router-dom'; 
import { UseStateContext } from "../context/contextProvider.jsx";
import Navbar from '../components/Navbar/Navbar.jsx';

function GuestLayout() {

  const {token} = UseStateContext();
  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default GuestLayout;
