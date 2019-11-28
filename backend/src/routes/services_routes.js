const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services_controller');

router.route('/create').post(ServicesController.createServices);
router.route('/pay/:paymentCode').put(ServicesController.payServices);
router.route('/:paymentCode').put(ServicesController.updateServices);
router.route('/:paymentCode').delete(ServicesController.deleteServices);

module.exports = router;