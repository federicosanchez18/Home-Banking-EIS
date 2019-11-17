const User = require('../models/user');
const ErrorHandler = require('../errors_response/error_handler');
const ErrorToFindUser = require('../errors_response/error_to_find_user');
const ErrorPasswordInvalid = require('../errors_response/error_password_invalid');
const ErrorValidation = require('../errors_response/error_validation');

module.exports = class UserController {

    static async registerUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.send(user);
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
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            if(!await user.comparePassword(req.body.password)){
                return ErrorHandler.handleError(res, new ErrorPasswordInvalid());
            } else {
                res.json({message: `The user ${user.username} is login correctly`});
            }
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.json(user);
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async deleteUser(req, res){
        try {
            const user = await User.findOneAndDelete({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.json({message: `${user.dni} is deleted`});
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }

    static async getUser(req, res) {
        try {
            const user = await User.findOne({id: req.params.id});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.send(user);
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
    
    static async toDepositAmount(req, res) {
        try {
            const user = await User.findOneAndUpdate({id: req.params.id}, {$inc: {amount: req.body.amount}}, {new: true});
            if (!user) {
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            res.send(user);
        } catch (error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
}