const ErrorResponse = require('./error_response');

module.exports = class ErrorIsNotNumber extends ErrorResponse {

    constructor(amountOrLimit) {
        super(400, `Ingrese un ${amountOrLimit} válido. Sólo se aceptan números`);
    }
}