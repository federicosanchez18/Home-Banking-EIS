const User = require('../models/user');
const ErrorHandler = require('../errors_response/error_handler');
//const ErrorToFindUser = require('../errors_response/error_to_find_user');
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
}