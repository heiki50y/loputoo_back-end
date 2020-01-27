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
    const users = await User.findAll();

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
    const user = await User.findByPk(req.params.id);

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
  
  try {
    

    // await User.update(req.body, {
    //   where: { id: id }
    // })

    await User.update(
      {firstName: req.body.firstName},
      {returning: true, where: {id: id} }
    )

    if(!id) {
      return  next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({success: true, data: req.body});

  } catch (err) {
    next(err);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {

    await User.destroy({
      where: { id: id }
    })

    if(!id) {
      return  next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }
    
    res.status(200).json({success: true, data: {}});

  } catch (err) {
    next(err);
  }
};
