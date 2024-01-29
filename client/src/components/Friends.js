import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Friends = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/friends/${userId}`);
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div>
      <h1>Friends List</h1>
      {friends.length === 0 ? (
        <p>No friends available.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <strong>User ID:</strong> {friend.id}, <strong>Username:</strong> {friend.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Friends;
