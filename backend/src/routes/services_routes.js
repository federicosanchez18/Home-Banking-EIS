const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services_controller');

//POST
router.route('/create/:id').post(ServicesController.createServicesAndSend);
//GET
router.route('/paymentcode/:paymentCode').get(ServicesController.getServicesToPaymentCode);
router.route('/:objectId').get(ServicesController.getServicesToObjectId);
//PUT
router.route('/pay/:paymentCode').put(ServicesController.payServices);
router.route('/:paymentCode').put(ServicesController.updateServices);
//DELETE
router.route('/:paymentCode').delete(ServicesController.deleteServices);

module.exports = router;