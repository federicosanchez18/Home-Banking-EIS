const User = require('../models/user');
const rp = require('request-promise');
const Bcrypt = require('bcryptjs');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFindUser = require('../errors_response/error_to_find_user_or_services');
const ErrorValidation = require('../errors_response/error_validation');
const ValidationHandler = require('../validations/validation_handler');

module.exports = class UserController {

    static async registerUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.send({registerUser: user});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async loginUser(req, res) {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({$or:[{username: username}, {email: email}]}).exec();
            ValidationHandler.validationFindUser(user, res);
            ValidationHandler.comparePasswordAndLogin(user, password, res);
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateUserServices(req, res) {
        try {
            const id = req.params.id;
            const services = req.body.services;
            const user = await User.findOneAndUpdate({id: id}, {$addToSet: {services: {$each: [services]}}}, {new: true});
            ValidationHandler.validationFindUser(user, res);
            res.send({user});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            req.body.password = await Bcrypt.hash(req.body.password, 10);
            const user = await User.findOneAndUpdate({id: id}, {$set: req.body}, {new: true});
            ValidationHandler.validationFindUser(user, res);
            res.send({userupdated: user});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async deleteUser(req, res){
        try {
            const user = await User.findOneAndDelete({id: req.params.id});
            ValidationHandler.validationFindUser(user, res);
            res.json({message: `${user.dni} is deleted`});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
    
    static async toDepositAmount(req, res) {
        try {
            const id = req.params.id;
            const amount = req.body.amount;
            ValidationHandler.validationOfAmountGreaterThanZero(amount, res);
            const user = await User.findOneAndUpdate({id: id}, {$inc: {amount: +amount}}, {new: true});
            ValidationHandler.validationFindUser(user, res);
            res.send(user);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async toExtractAmount(req, res) {
        try {
            const amount = req.body.amount;
            const id = req.params.id;
            ValidationHandler.validationOfAmountGreaterThanZero(amount, res);
            const user = await User.findOne({id: id});
            ValidationHandler.validationFindUser(user, res);
            ValidationHandler.validationLimitExtractAndOfResultGreaterThanZero(amount, user, id, res);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateLimit(req, res) {
        try {
            const limit = req.body.limit;
            const id = req.params.id;
            ValidationHandler.validationOfLimitGreaterThanZero(limit, id, res);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async getUserCBU(req, res) {
        try {
            const user = await User.findOne({id: req.params.id});
            ValidationHandler.validationFindUser(user, res);
            res.send(user.cbu);
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async toTransfer(req, res) {
        try {
            const amount = req.body.amount;
            const id = req.params.id;
            const cbu = req.body.cbu;
            ValidationHandler.validationOfAmountGreaterThanZero(amount, res);
            const user = await User.findOne({id: id});
            ValidationHandler.validationFindUser(user, res);
            ValidationHandler.validationOfTheAmountToBeTransferred(amount, user.amount, id, cbu, res);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async paidServices(req, res){
        const user = await User.findOne({id: req.params.id});
        const paymentCode = req.body.paymentCode;
        if (!user) {
            return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
        }
        const options = {
            uri: `http://localhost:3060/services/pay/${paymentCode}`,
            json: {amount: user.amount},
            method: 'PUT'
        }
        return rp(options)
                .then(async data => {
                    if (data.paidServices.payServices){
                        const user = await User.findOneAndUpdate({id: req.params.id}, {$inc:{amount: -data.paidServices.amount}}, {new: true});
                        res.send({userPaidServices: user});
                    }
                }).catch(error => {
                    return ErrorHandler.handleError(res, new ErrorValidation(error.message));
                })
    }

    static async getServices(req, res){
        const user = await User.findOne({id: req.params.id});
        if (!user){
            return ErrorHandler.handleError(res, new ErrorToFindUser());
        }
        global.getServices = [];
        var count = 0;
        await user.services.forEach(service => {
            const options = {
                uri: `http://localhost:3060/services/${service}`,
                method: 'GET'
            };
            return rp(options)
                .then(data => {
                    const d = JSON.parse(data);
                    if (d){
                        getServices.push(d.services.paymentCode);
                        count++;
                    }
                    if (user.services.length == count){
                        res.send(getServices);
                    }
                }).catch(error => {
                    return ErrorHandler.handleError(res, new ErrorValidation(error.message));
                });
        });
    }
}