import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import './Login.css'
import { useNavigate } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('OK');

  const navigate = useNavigate();

  const {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit = async(data)=>{
    // console.log(data)
    const userEmail = data.userEmail;
    const userPassword = data.userPassword
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      const user = users.find(
        (user) => user.email === userEmail && user.password === userPassword
      );

      if (user) {
        setMessage('Login successful');
        setEmail(user.email)
        setPassword(user.password)
        
        localStorage.setItem('userEmail', user.email)
        alert(`\nEmail : ${user.email} \nPassword : ${user.password}` )
        navigate('/main')

      } else {
        setMessage('Invalid username or password');
        alert("Login is UnSuccessfull")
      }

    } catch (error) {
      alert('An error occurred');
    }


  }

  return (
    <div>
      <h4 className='text-warning fw-bolder fs-2 '>Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input Email */}
        <div>
          {/* {errors.userEmail&& <label htmlFor='userEmail' className='text-warning me-2'>{errors.userEmail.message}</label>} */}
          <input type="email" placeholder='Enter E-mail'  id='userEmail' {...register('userEmail')}/>
        </div> 
        <div  >
          <input type="password" placeholder='enter password' id='userPassword' {...register('userPassword')}/>
        </div> 
        <div>
          <button type='submit' > Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login