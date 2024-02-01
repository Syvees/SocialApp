const FriendRequestController = require('../controllers/friendRequest.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/friendRequests/send', FriendRequestController.sendFriendRequest); // --> send new friend request to user
    app.post('/api/friendRequests/accept', FriendRequestController.acceptFriendRequest); // --> accept friend request from other user
    app.post('/api/friendRequests/decline', FriendRequestController.declineFriendRequest); // --> decline friend request from other user
    app.get('/api/friendRequests/list/:userId', FriendRequestController.listFriendRequests); // --> list user's friend requests
    app.get('/api/friends/list/:userId',  FriendRequestController.listFriends); // --> list user's friends (that were accepted)
    app.post('/api/friends/remove',  FriendRequestController.removeFriendship); // --> remove a friend ffrom user's friend list
}