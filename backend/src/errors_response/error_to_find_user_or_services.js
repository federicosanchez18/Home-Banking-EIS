const ErrorResponse = require('./error_response');

module.exports = class ErrorToFindUserOrServices extends ErrorResponse {

    constructor(userOrServices) {
        super(404, `El ${userOrServices} no existe`);
    }
}