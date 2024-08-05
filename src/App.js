import React from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider} from  'react-router-dom';
import RootLayout from './components/rootLayout/RootLayout'
import Main from './components/main/Main';
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home'

function App() {
  const router = createBrowserRouter([{
    path:'/',
    element:<RootLayout/>,
    children:[
      // Home
      {
        path:'/',
        element:<Home/>
      },
      // Login
      {
        path:'/login',
        element:<Login/>
      },
      // Register
      {
        path:'/register',
        element:<Register/>
      },
      // Main
      {
        path:'/main',
        element:<Main/>
      }
    ]
  }
  ])

  return (
    <div className="">
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;
