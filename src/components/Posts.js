import React, { useEffect, useState } from 'react';
import PostsComponent from './Posts'; // Rename the import to match the new component name
import '../App.css'; // Import the App.css file

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts data from the server
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts'); // Replace with your API endpoint
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>User Posts</h2>
      <PostsComponent posts={posts} /> {/* Use the renamed component */}
    </div>
  );
};

export default Posts; // Export the renamed component
