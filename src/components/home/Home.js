import React from 'react'
import './Home.css'
import leftImage from '../../images/left.png';
import logo from '../../images/logo.png';
function Home() {
  return (
    <div className='main'>
        <div className='left' >
        <img id="leftImage" src={leftImage} />
        </div>
        <div className='right'>
         <img id="logo" src={logo}/>
          <h1>MONEY MONITOR</h1>
          <p>Track your spending, transform your savings.</p>
          
        </div>
        
    </div>
  )
}

export default Home