module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
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
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false // ensure a comment always has content
        }
    }, {
        tableName: 'comments',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true // Sequelize handles created_at and updated_at automatically
    });

    return Comment;
};
