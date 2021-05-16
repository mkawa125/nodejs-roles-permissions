const express = require('express');
const router = express.Router();
const userService = require('./userService');

async function getAllUsers(req, res, next) {

    try {
        const users = await userService.getAllUsers();

        return res.status(200).json({
            userMessage: 'Success',
            success: true,
            data: users
        });
    } catch (e) {
        return res.status(400).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: e.message,
            success: false
        });
    }
}

module.exports = {
    getAllUsers
}