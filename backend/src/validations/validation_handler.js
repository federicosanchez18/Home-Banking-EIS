const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFind = require('../errors_response/error_to_find_user_or_services');
const ErrorPasswordInvalid = require('../errors_response/error_password_invalid');
const ErrorSuperateToLimit = require('../errors_response/error_superate_to_limit');
const ErrorToNumberNegative = require('../errors_response/error_to_number_negative');
const ErrorAmountDontBeNegative = require('../errors_response/error_amount_dont_be_negative');

const User = require('../models/user');

module.exports = class ValidationHandler {

    static validationFindUser(user, res) {
        if(!user){
            return ErrorHandler.handleError(res, new ErrorToFind('user'));
        }
    }

    static async comparePasswordAndLogin(user, password, res){
        try {
            if(!await user.comparePassword(password)){
                return ErrorHandler.handleError(res, new ErrorPasswordInvalid());
            } else {
                res.send({message: `The user ${user.username} is login correctly`, loggedUser: user});
            }    
        } catch (error){}
    }

    static validationOfAmountGreaterThanZero(amount, res){
        if (amount < 0){
            return ErrorHandler.handleError(res, new ErrorToNumberNegative('monto'));
        }
    }

    static async validationLimitExtractAndOfResultGreaterThanZero(amount, user, id, res){
        try {
            const result = user.amount - amount;
            if (amount > user.limit) {
                return ErrorHandler.handleError(res, new ErrorSuperateToLimit());
            } if (result < 0) {
                return ErrorHandler.handleError(res, new ErrorAmountDontBeNegative('extracción'));
            } else {
                const userUp = await User.findOneAndUpdate({id: id}, {$inc: {amount: -amount}}, {new: true});
                res.send(userUp);
            }
        } catch (error){} 
    }

    static async validationOfLimitGreaterThanZero(limit, id, res){
        try {
            if (limit < 0){
                return ErrorHandler.handleError(res, new ErrorToNumberNegative('limit'));
            } 
            const user = await User.findOneAndUpdate({id: id}, {limit: limit}, {new: true});
            this.validationFindUser(user, res);
            res.send(user);
            
        } catch (error) {}
    }

    static async validationOfTheAmountToBeTransferred(amount, userAmount, id, cbu, res){
        try {
            const result = userAmount - amount;
            if (result < 0) {
                return ErrorHandler.handleError(res, new ErrorAmountDontBeNegative('transferencia'));
            }
            const userUp = await User.findOneAndUpdate({id: id}, {$inc: {amount: -amount}}, {new: true});
            const us = await User.findOneAndUpdate({cbu: cbu}, {$inc: {amount: +amount}}, {new: true});
            res.send(userUp);
        } catch (error){} 
    }
}