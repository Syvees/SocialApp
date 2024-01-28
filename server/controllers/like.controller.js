const db = require('../models'); // Adjust the path as necessary
const Like = db.Like;
const Post = db.Post

const LikeController = {
    // Add a like to a post by a user
    addLike: async (req, res) => {
        try {
            const { user_id, post_id } = req.body; //user_id and post_id will come from request body (not url params)
            const likeExists = await Like.findOne({
                where: {
                    user_id: user_id,
                    post_id: post_id
                }
            });

            if (likeExists) {
                return res.status(409).json({ message: 'You have already liked this post'});
            }
            const newLike = await Like.create({ user_id, post_id });
            res.status(201).json({ message: 'Like added successfully', newLike });
        } catch (error) {
            res.status(400).json({ message: 'Error adding like', error: error.message });
        }
    },

    // Remove a like from a post by a user
    removeLike: async (req, res) => {
        try {
            const { user_id, post_id } = req.body;
            const like = await Like.findOne({ where: { user_id, post_id } });
            if (like) {
                await like.destroy();
                res.json({ message: 'Like removed successfully' });
            } else {
                res.status(404).json({ message: 'Like not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error removing like', error: error.message });
        }
    },

    // Get all likes for a specific post
    getLikesByPost: async (req, res) => {
        try {
            const post_id = req.params.postId;
            const postExists = await Post.findOne({ where: {id: post_id}})
            if (!postExists) {
                return res.status(404).json({ message: 'Post does not exist' });
            }
            const likes = await Like.findAll({ where: { post_id: post_id } });
            res.json({ message: 'Likes retrieved successfully', likes });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving likes', error: error.message });
        }
    }
};

module.exports = LikeController;
