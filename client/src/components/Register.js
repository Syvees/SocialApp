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

  // State for error messages
  const [errors, setErrors] = useState({});

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
      const response = await axios.post('http://localhost:8000/api/users/register', registrationData, {withCredentials: true});
      navigate('/dashboard')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Construct an errors object from the array
        const errorsObj = error.response.data.errors.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(errorsObj);
      }
      console.error('Server response:', error.response.data);
    }
  };
  

  const renderErrorMessage = (field) => {
    if (errors[field]) {
      return <span className="error-message">{errors[field]}</span>;
    }
    return null;
  };
  
  
  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="register-input"
          />
          {renderErrorMessage('first_name')}
        </div>
  
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="register-input"
          />
          {renderErrorMessage('last_name')}
        </div>
  
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          {renderErrorMessage('email')}
        </div>
  
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          {renderErrorMessage('username')}
        </div>
  
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          {renderErrorMessage('password')}
        </div>
  
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;