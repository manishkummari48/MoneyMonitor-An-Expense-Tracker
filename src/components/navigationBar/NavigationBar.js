import React, { useEffect, useState } from 'react'
import './NavigationBar.css'
import { NavLink, useNavigate } from 'react-router-dom';
function NavigationBar() {

  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  const [loggedinEmail, setLoggedInEmail ] = useState()
  const navigate = useNavigate();

  // HANDLE LOGOUT
  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload()
  }

  useEffect(()=>{
      const userEmail = localStorage.getItem('userEmail');
      setLoggedInEmail(userEmail);
      if(userEmail!=null) {
        setIsUserLoggedin(true);
        navigate('main')
      }
      else{
        navigate('login');
      }
  },[localStorage.getItem('userEmail')])

  return (
    <div className='navigation-bar'>
       <div className="box box3">
            {isUserLoggedin&&<p>USER : {loggedinEmail}</p>}
            <NavLink to = "/">Home</NavLink>
            {isUserLoggedin && <NavLink to="/" onClick={()=>handleLogout()}>Logout</NavLink>}
            {isUserLoggedin && <NavLink to="/main">Main</NavLink>}
            {isUserLoggedin===false && <NavLink to="/login">Login</NavLink>} 
            {isUserLoggedin===false && <NavLink to="/register">Register</NavLink>} 
        </div>
    </div>
  )
}

export default NavigationBar