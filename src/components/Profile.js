import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the App.css file

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user'); // Update the API endpoint
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          {user.profile_picture && (
            <img src={`data:image/png;base64,${user.profile_picture}`} alt="Profile" />
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
