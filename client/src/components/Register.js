import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the App.css file
import { useNavigate } from 'react-router-dom';

const Register = ({ history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleRegister = async (e) => {
    e.preventDefault();
    const registrationData = { 
      first_name: firstName, 
      last_name: lastName, 
      email: email, 
      username: username, 
      password: password 
    };
    try {
      console.log(registrationData)
      const response = await axios.post('http://localhost:8000/api/users/register', registrationData, {withCredentials: true});
      navigate('/dashboard')
    } catch (error) {
      console.error('Server response:', error.response.data);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="register-input"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="register-input"
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
      />
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
