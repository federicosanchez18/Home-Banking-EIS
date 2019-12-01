const User = require('../models/user');
const rp = require('request-promise');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFindUser = require('../errors_response/error_to_find_user_or_services');
const ErrorPasswordInvalid = require('../errors_response/error_password_invalid');
const ErrorValidation = require('../errors_response/error_validation');
const ErrorAmountDontBeNegative = require('../errors_response/error_amount_dont_be_negative');
const ErrorSuperateToLimit = require('../errors_response/error_superate_to_limit');
const ErrorIsNotNumber = require('../errors_response/error_is_not_number');
const ErrorDepositNegative = require('../errors_response/error_to_deposit_negative_amount');


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
            const user = await User.findOne({$or:[{username: username}, {email: email}]}).exec();
            if(!user){
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            if(!await user.comparePassword(req.body.password)){
                return ErrorHandler.handleError(res, new ErrorPasswordInvalid());
            } else {
                res.send({message: `The user ${user.username} is login correctly`, loggedUser: user});
            }
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateUserServices(req, res) {
        try {
            const user = await User.findOneAndUpdate({id: req.params.id}, {$addToSet: {services: {$each: [req.body.services]}}}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            res.send({user});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            res.send({user});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async deleteUser(req, res){
        try {
            const user = await User.findOneAndDelete({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            res.json({message: `${user.dni} is deleted`});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
    
    static async toDepositAmount(req, res) {
        try {
            const amount = req.body.amount;
            if (!Number.isInteger(amount)){
                return ErrorHandler.handleError(res, new ErrorIsNotNumber('monto'));
            }
            if (amount < 0){
                return ErrorHandler.handleError(res, new ErrorDepositNegative());
            }
            const user = await User.findOneAndUpdate({id: req.params.id}, {$inc: {amount: +amount}}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            res.send(user);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async toExtractAmount(req, res) {
        try {
            const amount = req.body.amount;
            if (!Number.isInteger(amount)){
                return ErrorHandler.handleError(res, new ErrorIsNotNumber('monto'));
            }
            const user = await User.findOne({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            const result = user.amount - req.body.amount;
            if (req.body.amount > user.limit) {
                return ErrorHandler.handleError(res, new ErrorSuperateToLimit());
            } if (result < 0) {
                return ErrorHandler.handleError(res, new ErrorAmountDontBeNegative());
            } else {
                const userUp = await User.findOneAndUpdate({id: req.params.id}, {$inc: {amount: -amount}}, {new: true});
                res.send(userUp);
            }
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateLimit(req, res) {
        try {
            const limit = req.body.limit;
            if (!Number.isInteger(limit)){
                return ErrorHandler.handleError(res, new ErrorIsNotNumber('limite'));
            }
            const user = await User.findOneAndUpdate({id: req.params.id}, {limit: limit}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            res.send(user);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async getUserCBU(req, res) {
        try {
            const user = await User.findOne({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            res.send(user.cbu);
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async toTransfer(req, res) {
        try {
            const amount = req.body.amount;
            if (!Number.isInteger(amount)){
                return ErrorHandler.handleError(res, new ErrorIsNotNumber('monto'));
            }
            const user = await User.findOne({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser('user'));
            }
            const result = user.amount - req.body.amount;
            console.log(result);
            if (result < 0) {
                return ErrorHandler.handleError(res, new ErrorAmountDontBeNegative());
            }
            const userUp = await User.findOneAndUpdate({id: req.params.id}, {$inc: {amount: -amount}}, {new: true});
            const us = await User.findOneAndUpdate({cbu: req.body.cbu}, {$inc: {amount: +amount}}, {new: true});
            res.send(userUp);
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