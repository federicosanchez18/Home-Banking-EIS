const ErrorResponse = require('./error_response');

module.exports = class AmountDontBeNegative extends ErrorResponse {

    constructor() {
        super(400, 'The amount dont be negative');
    }
}