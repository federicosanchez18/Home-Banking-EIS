const ErrorResponse = require('./error_response');

module.exports = class ErrorTheServicesIsPaid extends ErrorResponse {

    constructor() {
        super(400, 'El servicio ya se encuentra pago');
    }
}