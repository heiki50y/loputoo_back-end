const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const User = db.user;


// Create account (register)
exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password, role, group} = req.body;
    
    try {
        const user = await User.create({
            firstName,
            lastName,
            email,  
            password,
            role,
            group
        });

        sendTokenResponse(user, 200, res);

    } catch (err) {
        next(err)
    }
};



// Login with user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email: email }});

        if(!user) {
            return next(new ErrorResponse('Invalid user', 401));
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return next(new ErrorResponse('Invalid password', 401));
        }

        sendTokenResponse(user, 200, res);

    } catch (err) {
        next(err)
    }
};

// Logout
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
      data: {}
    });
};

exports.userProfile = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
  
    res.status(200).json({
      success: true,
      data: user
    });
};

// Create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production');

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    });

}

