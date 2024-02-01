const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/posts/create', PostController.createPost); // --> create new post
    app.get('/api/posts',  PostController.getAllPosts) // --> get all posts
    app.get('/api/posts/:id', PostController.getPostById) // --> get post by post's ID
    app.put('/api/posts/:id',  PostController.updatePost) // --> update post by post's ID
    app.delete('/api/posts/:id', PostController.deletePost) // --> delete post by post's ID
}

