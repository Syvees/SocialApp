import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the App.css file
import { Link, useNavigate, useParams } from "react-router-dom"


const EditPost = () => {
    const [caption, setCaption] = useState('');
    const [post, setPost] = useState([]);
    const navigate = useNavigate()
    const {id} = useParams();
    const userId = 1; // Replace with variable user ID as needed


    useEffect (() => {
        axios.get(`http://localhost:8000/api/posts/${id}`)
        .then(res => {
            setCaption(res.data.caption);
            console.log(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = await axios.put('http://localhost:8000/api/posts/' + id, {
            user_id: userId,
            caption: caption,
            });
            setCaption('');
            navigate('/dashboard')
            } catch (error) {
            console.error('Error creating post:', error);
        }
        };

    return (
        <div className="dashboard-container">
            <h1>Update Post</h1>
            <form onSubmit={handlePostSubmit}>
                <label htmlFor="caption">New Post Caption: </label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)}></input>&nbsp;
                <button type="submit">Edit Post</button>
            </form>
        </div>
    );
};

export default EditPost;
