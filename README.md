API Routes

User Account Routes
    app.post('/api/users/register', UserController.register); // --> register new user account
    app.post('/api/users/login', UserController.login); // --> login  existing account
    app.post('/api/users/logout', UserController.logout) //  --> logout of account
    app.get('/api/users/getall', authenticate, UserController.getUsers) //  --> get all user info (must be logged in with a user account; used to test the 'authenticate' function)

Media Post Routes
    app.post('/api/posts/create', authenticate, PostController.createPost); // --> create new post
    app.get('/api/posts', authenticate, PostController.getAllPosts) // --> get all posts
    app.get('/api/posts/:id', authenticate, PostController.getPostById) // --> get post by post's ID
    app.put('/api/posts/:id', authenticate, PostController.updatePost) // --> update post by post's ID
    app.delete('/api/posts/:id', authenticate, PostController.deletePost) // --> delete post by post's ID


Comments Routes
    app.post('/api/comments/create', authenticate, CommentController.createComment); // --> add new comment to post
    app.get('/api/comments/post/:postId', authenticate, CommentController.getCommentsByPost); // --> get comments related to a post by post's ID
    app.put('/api/comments/:id', authenticate, CommentController.updateComment); // --> update comment by comment's ID
    app.delete('/api/comments/:id', authenticate, CommentController.deleteComment); // --> delete comment by comment's ID


Likes Routes 
    app.post('/api/likes/add', authenticate, LikeController.addLike); // --> add new like to a user's post
    app.get('/api/likes/:postId', authenticate, LikeController.getLikesByPost); // --> get all the likes on a user's post
    app.delete('/api/likes', authenticate, LikeController.removeLike); // --> remove user's like from a post

Friend Requests Routes
    app.post('/api/friendRequests/send', authenticate, FriendRequestController.sendFriendRequest); // --> send new friend request to user
    app.post('/api/friendRequests/accept', authenticate, FriendRequestController.acceptFriendRequest); // --> accept friend request from other user
    app.post('/api/friendRequests/decline', authenticate, FriendRequestController.declineFriendRequest); // --> decline friend request from other user
    app.get('/api/friendRequests/list/:userId', authenticate, FriendRequestController.listFriendRequests); // --> list user's friend requests
    app.get('/api/friends/list/:userId', authenticate, FriendRequestController.listFriends); // --> list user's friends (that were accepted)
    app.post('/api/friends/remove', authenticate, FriendRequestController.removeFriendship); // --> remove a friend ffrom user's friend list
