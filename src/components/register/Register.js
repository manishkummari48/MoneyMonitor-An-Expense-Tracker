import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        setMessage('User registered successfully');
      } else {
        setMessage('Failed to register user');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="register-container">
      <div className="card">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Enter E-mail"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Register;
