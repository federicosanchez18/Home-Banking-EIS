const ErrorResponse = require('./error_response');

module.exports = class ErrorToFindUser extends ErrorResponse {

    constructor() {
        super(404, 'This user dont exist');
    }
}