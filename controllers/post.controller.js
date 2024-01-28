const db = require('../models'); // Adjust the path as necessary
const Post = db.Post;
const User = db.User;

const PostController = {
    // Create a new post
    createPost: async (req, res) => {
        try {
            const { user_id, caption, media_content } = req.body;
            const newPost = await Post.create({ user_id, caption, media_content });
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
            res.status(400).json({ message: 'Error creating post', error: error.message });
        }
    },

    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.json({ message: 'Posts retrieved successfully', posts });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving posts', error: error.message });
        }
    },

    // Get a single post by ID
    getPostById: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id);
            if (post) {
                res.json({ message: 'Post retrieved successfully', post });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving post', error: error.message });
        }
    },

    // Update a post
    updatePost: async (req, res) => {
        try {
            const updated = await Post.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated[0] > 0) {
                const updatedPost = await Post.findByPk(req.params.id);
                res.json({ message: 'Post updated successfully', post: updatedPost });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating post', error: error.message });
        }
    },

    // Delete a post
    deletePost: async (req, res) => {
        try {
            const deleted = await Post.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.json({ message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error: error.message });
        }
    }
};

module.exports = PostController;
