// Posts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts');
            setPosts(response.data.posts.map(post => ({
                ...post,
                likeCount: Number.isInteger(post.likeCount) ? post.likeCount : 0
            })));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    fetchPosts();
}, [userId]);

  const handleLike = async (postId) => {
    try {
      await axios.post('http://localhost:8000/api/likes/add', { user_id: userId, post_id: postId });
      setLikedPosts(new Set([...likedPosts, postId]));
      updateLikeCount(postId, true);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await axios.delete('http://localhost:8000/api/likes', { data: { user_id: userId, post_id: postId } });
      setLikedPosts(new Set([...likedPosts].filter(id => id !== postId)));
      updateLikeCount(postId, false);
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

  const updateLikeCount = (postId, increment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        let likeCount = Number.isInteger(post.likeCount) ? post.likeCount : 0;
        return { ...post, likeCount: likeCount + (increment ? 1 : -1) };
      }
      return post;
    }));
  };

  const deletePost = async (postId) => {
    try {
        await axios.delete(`http://localhost:8000/api/posts/${postId}`);
        setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
        console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="dashboard-posts-container">
        <h2>Posts</h2>
        {posts.length === 0 ? (
            <p>No posts available.</p>
        ) : (
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>Caption:</strong> {post.caption}
                        {post.media_content && (
                            <img src={post.media_content} alt="Post Media" />
                        )}
                        <div>
                            <span>Likes: {post.likeCount}</span>
                            {likedPosts.has(post.id) ? (
                                <button onClick={() => handleUnlike(post.id)}>Unlike</button>
                            ) : (
                                <button onClick={() => handleLike(post.id)}>Like</button>
                            )}
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default Posts;
