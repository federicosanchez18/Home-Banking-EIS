const ErrorResponse = require('./error_response');

module.exports = class ErrorPasswordInvalid extends ErrorResponse {

    constructor() {
        super(400, 'La contraseña es inválida, por favor introduzca una contraseña correcta');
    }
}