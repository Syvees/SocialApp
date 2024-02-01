import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams} from "react-router-dom"
import '../App.css';

const Dashboard = () => {
  const [user, setUser] = useState(null); // State to hold user details
  const [posts, setPosts] = useState([]);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [friends, setFriends] = useState([]);
  const userId = 1; // Replace with variable user ID as needed
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        //const userDetails = await axios.get(`http://localhost:8000/api/users/${userId}`);
        const userPosts = await axios.get('http://localhost:8000/api/posts');
        const userFriends = await axios.get(`http://localhost:8000/api/friends/list/${userId}`);
        
        //setUser(userDetails.data);
        setPosts(userPosts.data.posts);
        setFriends(userFriends.data.friends);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await axios.post('http://localhost:8000/api/posts/create', {
        user_id: userId,
        caption: newPostCaption,
      });
      setNewPostCaption('');
      setPosts([...posts, newPost.data.post]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const deleteHandler = (postId) => {
    axios.delete("http://localhost:8000/api/posts/" + postId)
    .then(res => {
        removeFromDom(postId)
    })
    .catch((err) => {console.log(err)});    
} 

const removeFromDom = postId => {
    setPosts(posts.filter(post => post.id != postId))
}

const editHandler = (postId) => {
  navigate(`/posts/edit/`+ postId)
}

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {user && (
        <p>
          Welcome to your dashboard, {user.first_name} {user.last_name}!
        </p>
      )}
      <form onSubmit={handlePostSubmit}>
        <label htmlFor="newPostCaption">New Post Caption: </label>
        <input
          type="text"
          id="newPostCaption"
          value={newPostCaption}
          onChange={(e) => setNewPostCaption(e.target.value)}
        />&nbsp;
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
                {/* Link to friend's profile */}
                <Link to={`/friends/${friend.id}`}>
                  {friend.username}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard-posts-container">
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>Caption:</strong> {post.caption}
                {/* Render media content if available */}
                {post.media_content && (
                  <img src={post.media_content} alt="Post Media" />
                )} &nbsp;
                <button onClick = {e => {editHandler(post.id)}} className="btn btn-primary btn-sm">Edit</button>
                <button onClick = {e => {deleteHandler(post.id)}} className="btn btn-primary btn-sm">Delete</button>
              </li>
            ))} 
          </ul>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
