const db = require('../models'); // Adjust path as necessary
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
    register: async (req, res) => {
        try {
            const { first_name, last_name, username, email, password } = req.body;
            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ message: "User already exists!" });
            }

            const newUser = await User.create({ first_name, last_name, username, email, password });
            const userToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

            res
            .cookie("usertoken", userToken, { httpOnly: true })
            .json({ msg: "success!", user: newUser });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ message: "Invalid email" });
            }

            const correctPW = await bcrypt.compare(password, user.password);
            if (!correctPW) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res
            .cookie("usertoken", userToken, { httpOnly: true })
            .json({ msg: "success!" });
        } catch (error) {
            res.status(400).json(error);
        }
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    getUsers: (req, res) => {
        User.findAll({})
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    }

};

module.exports = UserController;
