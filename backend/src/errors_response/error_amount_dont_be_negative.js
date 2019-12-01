const ErrorResponse = require('./error_response');

module.exports = class AmountDontBeNegative extends ErrorResponse {

    constructor() {
        super(400, 'El monto no puede ser negativo, ingrese un monto válido');
    }
}