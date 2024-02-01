const CommentController = require('../controllers/comment.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/comments/create',  CommentController.createComment); // --> add new comment to post
    app.get('/api/comments/post/:postId', CommentController.getCommentsByPost); // --> get comments related to a post by post's ID
    app.put('/api/comments/:id', CommentController.updateComment); // --> update comment by comment's ID
    app.delete('/api/comments/:id', CommentController.deleteComment); // --> delete comment by comment's ID
}
 