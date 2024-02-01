const LikeController = require('../controllers/like.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/likes/add', LikeController.addLike); // --> add new like to a user's post
    app.get('/api/likes/:postId', LikeController.getLikesByPost); // --> get all the likes on a user's post
    app.delete('/api/likes', LikeController.removeLike); // --> remove user's like from a post
}