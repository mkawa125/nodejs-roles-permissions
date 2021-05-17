const User = require("../users/userModel");
const bcrypt = require("bcryptjs");
const passport = require("passport"); 
const jwt = require("jsonwebtoken");
const {SECRET} = require("../../config");

async function getAllUsers() {
    return await User.find();
}

async function getUserById(userId) {
    return await User.findById(userId);
}

async function updateUser(userId, userDetails){
    const user = await User.findById(userId);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userDetails.username && await User.findOne({ username: userDetails.username })) {
        throw 'Username "' + userDetails.username + '" is already taken';
    }

    // hash password if it was entered
    if (userDetails.password) {
        userDetails.password = bcrypt.hashSync(userDetails.password, 10);
    }

    // copy userDetails properties to user
    Object.assign(user, userDetails);
    await user.save();
}

async function deleteUser(userId) {
    await User.findByIdAndRemove(userId);
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
