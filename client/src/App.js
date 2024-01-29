import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import Navbar from './components/Navbar';
import Friends from './components/Friends'; // Import Friends component


function App() {
  const userId = 1; // Replace with the actual user ID

  return (
    <Router>
        <Navbar /> {/* Include the Navbar component */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add this line for Dashboard */}
          <Route path="/friends" element={<Friends userId={userId} />} />
        </Routes>
    </Router>
  );
}

export default App;
