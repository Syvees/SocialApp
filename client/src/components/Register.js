import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the App.css file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Update the endpoint to match your server route
      const response = await axios.post('http://localhost:8000/api/users/register', {
        username,
        password,
      });

      if (response.data.success) {
        // Redirect to Dashboard upon successful registration
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
    </div>
  );
};

export default Register;
