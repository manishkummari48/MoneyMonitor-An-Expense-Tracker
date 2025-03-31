import React, { useEffect, useState, useContext } from 'react';
import './NavigationBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import { loginContext } from '../../contexts/loginContext';

function NavigationBar() {
  let [loggedInUser,loginErr,userLoginStatus,loginUser,logoutUser] = useContext(loginContext)

  const navigate = useNavigate();

 
  

  return (
    <div className="navigation-bar">
      <div className="logo-container">
        <img src={logo} alt="Website Logo" className="logo" />
      </div>
      <div className="box box3">
        {userLoginStatus && <p>USER: {loggedInUser.username}</p>}
        <NavLink to="/">Home</NavLink>
        {!userLoginStatus && <NavLink to="/register">Register</NavLink>}
        {userLoginStatus && <NavLink to="/main">Main</NavLink>}
        {userLoginStatus && <NavLink to="/" onClick={logoutUser}>Logout</NavLink>}
        {!userLoginStatus && <NavLink to="/login">Login</NavLink>} 
         
      </div>
    </div>
  );
}

export default NavigationBar;
