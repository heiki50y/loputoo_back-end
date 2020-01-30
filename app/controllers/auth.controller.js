const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const User = db.user;


// Create account (register)
exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    
    try {
        const user = await User.create({
            firstName,
            lastName,
            email,  
            password,
            role
        });

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        });

    } catch (err) {
        next(err)
    }
};