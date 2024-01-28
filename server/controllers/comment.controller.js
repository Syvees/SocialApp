const db = require('../models'); // Adjust the path as necessary
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;

const CommentController = {
    // Create a new comment
    createComment: async (req, res) => {
        try {
            const { user_id, post_id, content } = req.body;
            console.log(user_id, post_id, content)
            const newComment = await Comment.create({ user_id, post_id, content });
            res.status(201).json({ message: 'Comment created successfully', comment: newComment });
        } catch (error) {
            res.status(400).json({ message: 'Error creating comment', error: error.message });
        }
    },

    // Get all comments for a specific post
    getCommentsByPost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const comments = await Comment.findAll({
                where: { post_id: postId },
            });
            res.json({ message: 'Comments retrieved successfully', comments });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving comments', error: error.message });
        }
    },

    // Update a comment
    updateComment: async (req, res) => {
        try {
            const updated = await Comment.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated[0] > 0) {
                const updatedComment = await Comment.findByPk(req.params.id);
                res.json({ message: 'Comment updated successfully', comment: updatedComment });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating comment', error: error.message });
        }
    },

    // Delete a comment
    deleteComment: async (req, res) => {
        try {
            const deleted = await Comment.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.json({ message: 'Comment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting comment', error: error.message });
        }
    }
};

module.exports = CommentController;
