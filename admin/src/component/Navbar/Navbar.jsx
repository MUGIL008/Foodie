import React from 'react';
import './Navbar.css';
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    window.location.reload(); // or use navigate('/') if you prefer route-based redirect
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <div className="navbar-right">
        <img className='profile' src={assets.profile_image} alt="Profile" />
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
