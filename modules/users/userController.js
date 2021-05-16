const express = require('express');
const router = express.Router();
const userService = require('./userService');

function getAllUsers(req, res, next) {

    console.log(req)
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}


module.exports = {
    getAllUsers
}