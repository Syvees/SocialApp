import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the App.css file

const Dashboard = () => {
  const [users, setUser] = useState(); // State to hold user details
  const [posts, setPosts] = useState([]);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = 1;
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };    
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
    
    fetchUserDetails();
    fetchPosts();
    fetchFriends();
  }, []);
  
  const createPost = async (req, res) => {
    try {
      const { user_id, caption } = req.body;
      const response = await axios.post('http://localhost:8000/api/posts/create', {
        user_id,
        caption,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };
  const fetchPosts = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have user_id available (replace with your actual logic)
      const user_id = 1; // Replace with the actual user_id or get it dynamically
      const newPost = await createPost(user_id, newPostCaption);
      console.log('New Post:', newPost);

      const posts = await fetchPosts(user_id);
      console.log('Fetched Posts:', posts);
    } catch (error) {
      console.error('Error handling post submission:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {users && (
        <p>
          Welcome to your dashboard, {users.first_name} {users.last_name}! 
        </p>
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
