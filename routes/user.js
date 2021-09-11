const express = require('express');

const userController = require('../controllers/user');

// const router = express.Router();

const router = require('express-promise-router')();

router.route('/').get(userController.index).post(userController.newUser);

module.exports = router;