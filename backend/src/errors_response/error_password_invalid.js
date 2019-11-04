const ErrorResponse = require('./error_response');

module.exports = class ErrorPasswordInvalid extends ErrorResponse {

    constructor() {
        super(400, 'This password is invalid');
    }
}