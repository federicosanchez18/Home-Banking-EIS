const rp = require('request-promise');
const Services = require('../models/services');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFindServices = require('../errors_response/error_to_find_user_or_services');
const ErrorValidation = require('../errors_response/error_validation');
const ErrorYourAmountNotEnough = require('../errors_response/error_your_amount_not_enough');
const ErrorTheServicesIsPaid = require('../errors_response/error_the_services_is_paid');

module.exports = class ServicesController {

    static async createServicesAndSend(req, res) {
        try {
        const services = new Services(req.body);
        await services.save();
        if (process.env.NODE_ENV === 'test') {
            return res.send({services: services});
        }
        const options = {
        uri: `http://localhost:3060/user/services/${req.params.id}`,
            json: {services: services},
            method: 'PUT'
        }
        return rp(options)
                .then(data => {
                    if (data.user){
                        res.send({services: services});
                    }
                }).catch(error => {
                    return ErrorHandler.handleError(res, new ErrorValidation(error.message));
                })
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async getServicesToPaymentCode(req,res){
        try {
            const paymentCode = req.params.paymentCode;
            const service = await Services.findOne({paymentCode: paymentCode});
            if (!service) {
                return ErrorHandler.handleError(res, new ErrorToFindServices('services'));
            }
            res.send({services: service});            
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async getServicesToObjectId(req,res){
        try {
            const objectId = req.params.objectId;
            const service = await Services.findOne({_id: objectId});
            if (!service) {
                return ErrorHandler.handleError(res, new ErrorToFindServices('services'));
            }
            res.send({services: service});            
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async payServices(req, res) {
        try {
            const paymentCode = req.params.paymentCode;
            const amountUser = req.body.amount;
            const services = await Services.findOne({paymentCode: paymentCode}).exec();
            if(!services){
                return ErrorHandler.handleError(res, new ErrorToFindServices('services'));
            }
            if(!services.payServices){
                if(amountUser>=services.amount){
                    const paidServices = await Services.findOneAndUpdate({paymentCode: paymentCode}, {payServices: true}, {new: true});
                    res.send({paidServices: paidServices});
                } else {
                    return ErrorHandler.handleError(res, new ErrorYourAmountNotEnough());
                }
            } else {
                return ErrorHandler.handleError(res, new ErrorTheServicesIsPaid());
            }
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateServices(req, res) {
        try {
            const services = await Services.findOneAndUpdate({paymentCode: req.params.paymentCode}, {$set: req.body}, {new: true});
            if (!services) {
                return ErrorHandler.handleError(res, new ErrorToFindServices('services'));
            }
            res.send({services: services});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async deleteServices(req, res){
        try {
            const services = await Services.findOneAndDelete({paymentCode: req.params.paymentCode});
            if (!services) {
                return ErrorHandler.handleError(res, new ErrorToFindServices('services'));
            }
            res.send({message: `${req.params.paymentCode} is deleted`});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
}