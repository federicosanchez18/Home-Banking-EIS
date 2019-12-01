const ErrorResponse = require('./error_response');

module.exports = class AmountDontBeNegative extends ErrorResponse {

    constructor() {
        super(400, 'Has superado el límite de extracción, vuelve a intentar con un monto menor');
    }
}

