const ErrorResponse = require('./error_response');

module.exports = class ErrorYourAmountNotEnough extends ErrorResponse {

    constructor() {
        super(404, 'This amount not enough');
    }
}