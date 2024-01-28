const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(50), // Updated length to 50
            allowNull: false, // don't allow null
            validate: {
                len: {
                    args: [2, 50],
                    msg: "First name must be between 2 and 50 characters"
                },
                is: {
                    args: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                    msg: "Please enter a valid first name"
                }
            }
        },
        last_name: {
            type: DataTypes.STRING(50), // Updated length to 50
            allowNull: false, // don't allow null
            validate: {
                len: {
                    args: [2, 50],
                    msg: "Last name must be between 2 and 50 characters"
                },
                is: {
                    args: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                    msg: "Please enter a valid last name"
                }
            }
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false, // don't allow null
            validate: {
                len: {
                    args: [3, 20],
                    msg: "Username must be between 3 and 20 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false, // don't allow null
            validate: {
                isEmail: true,
                matches: {
                    args: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    msg: "Please enter a valid email address"
                },
                len: {
                    args: [5, 60],
                    msg: "Email must be between 5 and 60 characters"
                }
            }
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false, // don't allow null
            validate: {
                len: {
                    args: [8, 60],
                    msg: "Password must be between 8 and 60 characters"
                }
            }
        },
        profile_picture: {
            type: DataTypes.BLOB('medium'),
            allowNull: true
            // No  validation for the profile picture
        }
    }, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            beforeCreate: async (user, options) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });
    User.prototype.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

    return User;
};
