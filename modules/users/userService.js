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

module.exports = {
    getAllUsers,
    getUserById
}
