import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUsername = (username) => {
    return /^[a-z0-9]+$/.test(username);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleRegister = () => {
    if (!name || !email || !username || !password) {
      alert('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }
    if (!validateUsername(username)) {
      alert('Username must contain only lowercase letters and numbers');
      return;
    }
    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character or number');
      return;
    }

    const newUser = { name, email, username, password };
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Ensure users is an array
    if (!Array.isArray(users)) {
      users = [];
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/">Click here to login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
