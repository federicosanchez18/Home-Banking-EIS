const ErrorResponse = require('./error_response');

module.exports = class ErrorToNumberNegative extends ErrorResponse {

    constructor(amountOrLimit) {
        super(400, `No se aceptan ${amountOrLimit} negativo, ingrese un ${amountOrLimit} válido`);
    }
}