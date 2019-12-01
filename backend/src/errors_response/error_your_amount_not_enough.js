const ErrorResponse = require('./error_response');

module.exports = class ErrorYourAmountNotEnough extends ErrorResponse {

    constructor() {
        super(400, 'El monto no es suficiente');
    }
}