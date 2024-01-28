const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/users/register', UserController.register); // --> register new user account
    app.post('/api/users/login', UserController.login); // --> login  existing account
    app.post('/api/users/logout', UserController.logout) //  --> logout of account
    app.get('/api/users/getall', authenticate, UserController.getUsers) //  --> get all user info (must be logged in with a user account; used to test the 'authenticate' function)
}