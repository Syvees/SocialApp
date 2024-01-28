module.exports = (sequelize, DataTypes) => {

    const Like = sequelize.define('Like', {
        like_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Refers to 'users' table
                key: 'id',
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts', // Refers to 'posts' table
                key: 'id',
            }
        }
    }, {
        tableName: 'likes',
        timestamps: false // Sequelize handles created_at and updated_at automatically
    });

    return Like;
};
