import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the App.css file

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Fetch friends when the component mounts
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/friends'); // Assuming an endpoint to get friends
        setFriends(response.data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchPosts();
    fetchFriends();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/posts', {
        caption: newPostCaption,
      });
      setPosts([...posts, response.data.post]);
      setNewPostCaption('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

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
        {/* Container for Friends */}
        <div className="dashboard-friends">
          <h2>My Friends</h2>
          {friends.length === 0 ? (
            <p>No friends available.</p>
          ) : (
            <ul>
              {friends.map((friend) => (
                <li key={friend.id}>
                  <Link to={`/friends/${friend.id}`}>
                    {/* Assuming you have an image URL for the friend's profile picture */}
                    <img src={friend.profilePictureUrl} alt={`Profile of ${friend.username}`} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="dashboard-posts-container">
        {/* Container for Posts */}
        <div className="dashboard-posts">
          <h2>My Posts</h2>
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <strong>User ID:</strong> {post.user_id}, <strong>Caption:</strong> {post.caption}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
