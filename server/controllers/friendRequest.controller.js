const db = require('../models');
const FriendRequest = db.FriendRequest;
const User = db.User;

const FriendRequestController = {
    // Send a friend request
    sendFriendRequest: async (req, res) => {
        const { requestor_user_id, target_user_id } = req.body;
        try {
            // Check if the target user exists
            const targetUser = await User.findByPk(target_user_id);
            if (!targetUser) {
                return res.status(404).json({ message: 'Target user not found' });
            }

            // Check for existing friend request (in either direction)
            const existingRequest = await FriendRequest.findOne({
                where: {
                    [db.Sequelize.Op.or]: [
                        { requestor_user_id: requestor_user_id, target_user_id: target_user_id },
                        { requestor_user_id: target_user_id, target_user_id: requestor_user_id }
                    ],
                    status: { [db.Sequelize.Op.in]: ['pending', 'accepted'] }
                }
            });

            if (existingRequest) {
                return res.status(409).json({ message: 'Friend request already exists or friendship already established' });
            }

            // Create the friend request
            const newFriendRequest = await FriendRequest.create({ requestor_user_id, target_user_id, status: 'pending' });
            res.status(201).json({ message: 'Friend request sent successfully', friendRequest: newFriendRequest });
        } catch (error) {
            res.status(500).json({ message: 'Error sending friend request', error: error.message });
        }
    },

    // Accept a friend request
    acceptFriendRequest: async (req, res) => {
        const { request_id } = req.body; // or req.params.request_id if passed as URL parameter
        try {
            const friendRequest = await FriendRequest.findByPk(request_id);
            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found' });
            }

            friendRequest.status = 'accepted';
            await friendRequest.save();

            res.json({ message: 'Friend request accepted' });
        } catch (error) {
            res.status(500).json({ message: 'Error accepting friend request', error: error.message });
        }
    },

    // Decline a friend request
    declineFriendRequest: async (req, res) => {
        const { request_id } = req.body; // or req.params.request_id if passed as URL parameter
        try {
            const friendRequest = await FriendRequest.findByPk(request_id);
            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found' });
            }

            friendRequest.status = 'declined';
            await friendRequest.save();

            res.json({ message: 'Friend request declined' });
        } catch (error) {
            res.status(500).json({ message: 'Error declining friend request', error: error.message });
        }
    },

    // List friend requests (optional, based on your requirements)
    listFriendRequests: async (req, res) => {
        const { userId } = req.params; // Assuming you're passing the user ID as a URL parameter
        try {
            const friendRequests = await FriendRequest.findAll({
                where: { target_user_id: userId, status: 'pending' },
            });
            res.json({ message: 'Friend requests retrieved successfully', friendRequests });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving friend requests', error: error.message });
        }
    },

    // show user's friend list by their ID
    listFriends: async (req, res) => {
        const userId = req.params.userId; // Assuming the user's ID is passed in the URL
        try {
            const friends = await FriendRequest.findAll({
                where: {
                    [db.Sequelize.Op.or]: [{ requestor_user_id: userId }, { target_user_id: userId }],
                    status: 'accepted'
                },
            });
            // Process the result to extract friend details (optional)
            // ...

            res.json({ message: 'Friends retrieved successfully', friends });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving friends', error: error.message });
        }
    },

    //remove friendship from users
    removeFriendship: async (req, res) => {
        const { userId, friendId } = req.body; // Assuming the user's ID and friend's ID are passed in the body
        try {
            const friendRequest = await FriendRequest.findOne({
                where: {
                    [db.Sequelize.Op.or]: [
                        { requestor_user_id: userId, target_user_id: friendId },
                        { requestor_user_id: friendId, target_user_id: userId }
                    ],
                    status: 'accepted'
                }
            });

            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found' });
            }

            friendRequest.status = 'declined'; // or you might delete the record
            await friendRequest.save();

            res.json({ message: 'Friendship removed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing friendship', error: error.message });
        }
    }
};

module.exports = FriendRequestController;
