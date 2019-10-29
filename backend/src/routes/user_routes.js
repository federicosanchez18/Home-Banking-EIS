const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.route('/').post(UserController.registerUser);

module.exports = router;