const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

//POST
router.route('/register').post(UserController.registerUser);
router.route('/login').post(UserController.loginUser);
//PUT
router.route('/deposit/:id').put(UserController.toDepositAmount);
router.route('/extraction/:id').put(UserController.toExtractAmount);
router.route('/limit/:id').put(UserController.updateLimit);
router.route('/transfer/:id').put(UserController.toTransfer);
router.route('/payservices/:id').put(UserController.paidServices);
router.route('/services/:id').put(UserController.updateUserServices);
//GET
router.route('/cbu/:id').get(UserController.getUserCBU);
router.route('/services/:id').get(UserController.getServices);
//DELETE
router.route('/delete/:id').delete(UserController.deleteUser);

module.exports = router;