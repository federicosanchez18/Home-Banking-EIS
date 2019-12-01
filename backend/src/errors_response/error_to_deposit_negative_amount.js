const ErrorResponse = require('./error_response');

module.exports = class ErrorDepositNegative extends ErrorResponse {

    constructor() {
        super(400, 'No se aceptan montos negativos, ingrese un monto válido');
    }
}