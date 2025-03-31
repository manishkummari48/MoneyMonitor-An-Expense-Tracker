
import React, { useContext, useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';
function Login() {
  let [loggedInUser,loginErr,userLoginStatus,loginUser] = useContext(loginContext)
  const [message, setMessage] = useState('OK');

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (userCredObj) => {
    loginUser(userCredObj);
    };

    useEffect(()=>{
      if(userLoginStatus === true){
        navigate("/main")
      }
      
    })

  return (
    <div className="login-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder='Enter Username' id='username' {...register('username')} />
          </div>
          <div>
            <input type="password" placeholder='Enter Password' id='password' {...register('password')} />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
          
        </form>

        {loginErr.length !==0 && (
            <p className="display-3 text-danger text-center">{loginErr}</p>
        )}
      </div>
    </div>
  );
}

export default Login;

