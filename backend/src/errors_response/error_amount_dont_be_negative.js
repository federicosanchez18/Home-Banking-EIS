const ErrorResponse = require('./error_response');

module.exports = class AmountDontBeNegative extends ErrorResponse {

    constructor(extractOrTransfer) {
        super(400, `No tienes un monto suficiente para realizar la ${extractOrTransfer} dada`);
    }
}