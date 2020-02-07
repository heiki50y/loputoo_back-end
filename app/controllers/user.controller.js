const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const User = db.user;
const Op = db.Sequelize.Op;

// Create new user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

      res.status(201).json({
        success: true,
        data: user
      });
  } catch (err) {
      next(err)
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {

  try {
    const users = await User.scope('withoutPassword').findAll();

    res.status(200).json({ 
      success: true, 
      count: users.length, 
      data: users
    });
  } catch (err) {
      next(err);
  }
};

// Get user
exports.getUser = async (req, res, next) => {
  
  try {
    const user = await User.scope('withoutPassword').findByPk(req.params.id);

    if(!user) {
      return  next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

      res.status(200).json({
        success: true,
        data: user 
      });

  } catch (err) {
      next(err);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.scope('withoutPassword').findByPk(req.params.id);
  try {
    
  if(!user) {
    return  next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  await User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }, { where: {id: id} })
                                         
  res.status(200).json({success: true, data: req.body});

  } catch (err) {
    next(err);
  }
};


// Delete user
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByPk(req.params.id);
  try {

    if(!user) {
      return  next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    await User.destroy({
      where: { id: id }
    })
 
    res.status(200).json({success: true, data: {}});

  } catch (err) {
    next(err);
  }
};
