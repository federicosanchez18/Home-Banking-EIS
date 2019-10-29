module.exports = class ErrorHandler {

    static handleError(res, error) {
        return res.status(error.status).json({
            error: true,
            message: error.message
        });
    }
}