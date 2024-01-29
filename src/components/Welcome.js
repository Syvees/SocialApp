import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the App.css file

function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Social App</h1>
      <Link to="/register">
        <button className="welcome-button">Register</button>
      </Link>
    </div>
  );
}

export default Welcome;
