import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginForm = ({ setLoggedIn, loggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggedIn) {
      console.log('Already logged in');
      navigate('/');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.message);
        setLoggedIn(true);
        
        setUsername('');
        setPassword('');
        navigate('/');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (loggedIn) {
    return null ;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
