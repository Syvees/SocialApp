// friend_requests.model.js
module.exports = (sequelize, DataTypes) => {
    const FriendRequest = sequelize.define('FriendRequest', {
        request_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        requestor_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        target_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'declined'),
            allowNull: true
        }
    }, {
        tableName: 'friend_requests',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: false
    });

    return FriendRequest;
};
