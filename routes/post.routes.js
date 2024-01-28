const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/posts/create', authenticate, PostController.createPost); // --> create new post
    app.get('/api/posts', authenticate, PostController.getAllPosts) // --> get all posts
    app.get('/api/posts/:id', authenticate, PostController.getPostById) // --> get post by post's ID
    app.put('/api/posts/:id', authenticate, PostController.updatePost) // --> update post by post's ID
    app.delete('/api/posts/:id', authenticate, PostController.deletePost) // --> delete post by post's ID
}

