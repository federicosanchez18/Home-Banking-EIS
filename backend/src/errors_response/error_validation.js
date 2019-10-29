const ErrorResponse = require('./error_response');

module.exports = class ErrorValidation extends ErrorResponse {

    constructor(errorMessage) {
        super(400, errorMessage);
    }
}