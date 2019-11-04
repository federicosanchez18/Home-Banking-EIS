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
            const user = await User.findOne({ email: req.body.email }).exec();
            if(!user){
                return ErrorHandler.handleError(res, new ErrorToFindUser());
            }
            if(!await user.comparePassword(req.body.password)){
                return ErrorHandler.handleError(res, new ErrorPasswordInvalid());
            } else {
                res.json({message: `The user ${user.name} is login correctly`});
            }
        } catch(error) {
            return ErrorHandler.handleError(res, new ErrorValidation(error.message));
        }
    }
}