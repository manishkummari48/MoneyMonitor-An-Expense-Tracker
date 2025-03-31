import React from 'react'
import './RootLayout.css'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../navigationBar/NavigationBar'


function RootLayout() {
  return (
    <div>
      {/* RootLayout */}
      <NavigationBar/>
      <Outlet/>
      
      
    </div>
  )
}

export default RootLayout