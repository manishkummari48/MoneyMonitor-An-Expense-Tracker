import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './Register.css';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = (newUser) => {
    axios.post('http://localhost:3500/users-api/register', newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate('/login');
        } else {
          
          setMessage(response.data.message);
        }
      })
      .catch((err) => {
        setMessage('An error occurred:',err.message);
      });
  };

  return (
    <div className="register-container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter Username"
            {...register('username', { 
              required: 'Username is required', 
              minLength: { value: 4, message: 'Username must be at least 4 characters long' },
              maxLength: { value: 20, message: 'Username must be at most 20 characters long' },
              pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' }
            })}
          />
          {errors.username && <p className="error small-error">{errors.username.message}</p>}
          
          <input
            type="password"
            placeholder="Enter Password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Password must contain at least one letter, one number, and one special character' }
            })}
          />
          {errors.password && <p className="error small-error">{errors.password.message}</p>}
          
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;


