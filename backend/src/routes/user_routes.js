const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.route('/register').post(UserController.registerUser);
router.route('/login').post(UserController.loginUser);
router.route('/:id').put(UserController.updateUser);
router.route('/:id').delete(UserController.deleteUser);
router.route('/deposit/:id').put(UserController.toDepositAmount);
router.route('/extraction/:id').put(UserController.toExtractAmount);
router.route('/limit/:id').put(UserController.updateLimit);
router.route('/transfer/:id').put(UserController.toTransfer);
router.route('/:id').get(UserController.getUserCBU);
router.route('/payservices/:id').put(UserController.paidServices);

module.exports = router;