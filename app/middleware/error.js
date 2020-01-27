const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message;

    console.log(err);
    // Validation error
    if (err.name === 'SequelizeValidationError') {
        const message = `All fields must be required`;
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
    
};

module.exports = errorHandler