// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Posts from './Posts'; // Import the Posts component
import '../App.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [friends, setFriends] = useState([]);
  const userId = 1; // Replace with dynamic user ID from authentication

  useEffect(() => {
    // Fetch user details and friends list
    const fetchData = async () => {
      try {
        // const userDetails = await axios.get(`http://localhost:8000/api/users/${userId}`);
        const userFriendsResponse = await axios.get(`http://localhost:8000/api/friends/list/${userId}`);
        
        // setUser(userDetails.data);
        setFriends(userFriendsResponse.data.friends);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/posts/create', {
        user_id: userId,
        caption: newPostCaption,
      });
      setNewPostCaption('');
      // Optionally, you can also update the posts list here if needed
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {user && (
        <p>Welcome to your dashboard, {user.first_name} {user.last_name}!</p>
      )}
      <form onSubmit={handlePostSubmit}>
        <label htmlFor="newPostCaption">New Post Caption:</label>
        <input
          type="text"
          id="newPostCaption"
          value={newPostCaption}
          onChange={(e) => setNewPostCaption(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>

      <div className="dashboard-friends-container">
        <h2>My Friends</h2>
        {friends.length === 0 ? (
          <p>No friends available.</p>
        ) : (
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>
                <Link to={`/friends/${friend.id}`}>{friend.username}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Posts userId={userId} />
    </div>
  );
};

export default Dashboard;
