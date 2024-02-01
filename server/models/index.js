const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure environment variables are loaded

// reference .env file for DATABASE URI
const sequelize = new Sequelize(process.env.DATABASE_URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models and store them in the 'db' object
db.User = require('./user.model.js')(sequelize, Sequelize);
db.Post = require('./post.model.js')(sequelize, Sequelize);
db.Comment = require('./comment.model.js')(sequelize, Sequelize);
db.Like = require('./like.model.js')(sequelize, Sequelize);
db.FriendRequest = require('./friendRequest.model.js')(sequelize, Sequelize);
// *****Add table relationships to sequelize model*****

// User-Post Associations
db.User.hasMany(db.Post, { foreignKey: 'user_id' });
db.Post.belongsTo(db.User, { foreignKey: 'user_id' });

// User-Comment Associations
db.User.hasMany(db.Comment, { foreignKey: 'user_id' });
db.Comment.belongsTo(db.User, { foreignKey: 'user_id' });

// Post-Comment Associations
db.Post.hasMany(db.Comment, { foreignKey: 'post_id'});
db.Comment.belongsTo(db.Post, { foreignKey: 'post_id' });

// Like-User Associations
db.User.hasMany(db.Like, { foreignKey: 'user_id' })
db.Like.belongsTo(db.User, { foreignKey: 'user_id'})

// Like-Post Associations
db.Post.hasMany(db.Like, { foreignKey: 'post_id'});
db.Like.belongsTo(db.Post, { foreignKey: 'post_id' });

// FriendRequest-User Associations
db.User.hasMany(db.FriendRequest, { foreignKey: 'requestor_user_id' });
db.FriendRequest.belongsTo(db.User, { foreignKey: 'requestor_user_id', as: 'Requestor' });

db.User.hasMany(db.FriendRequest, { foreignKey: 'target_user_id' });
db.FriendRequest.belongsTo(db.User, { foreignKey: 'target_user_id', as: 'Target' });




module.exports = db;
