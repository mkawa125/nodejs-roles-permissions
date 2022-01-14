const express = require('express');
const router = express.Router();
const userService = require('./userService');

async function getAllUsers(req, res, next) {

    try {
        const users = await userService.getAllUsers();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}


async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params.userId)
        return res.status(200).json({
            userMessage: 'Success',
            success: true,
            data: user
        });

    } catch (error) {
        return res.status(404).json({
            userMessage: 'User not found',
            developerMessage: error.message,
            success: false,
            
        });
    }
}


async function updateUser(req, res) {
    try {
        const updateUser = await userService.updateUser(req.params.userId, req.body)
        const user = await userService.getUserById(req.params.userId);
        return res.status(200).json({
            userMessage: 'User Updated Successfully',
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(404).json({
            userMessage: 'User not found',
            developerMessage: error.message,
            success: false,i
            
        });
    }
}

async function deleteUser(req, res) {
    try {
        userService.deleteUser(req.params.userId)
        const users = await userService.getAllUsers();
        return res.status(200).json({
            userMessage: 'User Deleted Successfully',
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(404).json({
            userMessage: 'User not found',
            developerMessage: error.message,
            success: false,
            
        });
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}