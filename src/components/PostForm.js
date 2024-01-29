import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the App.css file

const PostForm = ({ onPostCreated }) => {
  const [user_id, setUserId] = useState(''); // Add the user ID input
  const [caption, setCaption] = useState('');
  const [mediaContent, setMediaContent] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/posts/create', {
        user_id,
        caption,
        media_content: mediaContent, // Make sure this matches your server-side field name
      });

      onPostCreated(response.data.post);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="User ID"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Media Content"
        value={mediaContent}
        onChange={(e) => setMediaContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default PostForm;
