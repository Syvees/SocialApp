import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the App.css file

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" onClick={() => navigate('/')}>
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" onClick={() => navigate('/register')}>
            Register
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/dashboard" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" onClick={() => navigate('/profile')}>
            Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/friends" onClick={() => navigate('/friends')}>
            Friends
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/logout" onClick={() => navigate('/logout')}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
