module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // 'users' refers to the table name
                key: 'id',
            }
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: true // Allowing null as the post may only have media content
        },
        media_content: {
            type: DataTypes.BLOB, //if user wants to upload an image to post
            allowNull: true // Allowing null as the post may only have a caption
        }
    }, {
        tableName: 'posts',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true
    });

    return Post;
};
