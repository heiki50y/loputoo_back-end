const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const Newsfeed = db.newsfeed;
const Op = db.Sequelize.Op;

// Create new newfeed
exports.createNewFeed = async (req, res, next) => {
  try {
    const newFeed = await Newsfeed.create(req.body);

      res.status(201).json({
        success: true,
        data: newFeed
      });
  } catch (err) {
      next(err)
  }
};

// Get all users
exports.getAllNewFeeds = async (req, res, next) => {

  try {
    const newFeed = await Newsfeed.findAll();

    res.status(200).json({ 
      success: true, 
      count: newFeed.length, 
      data: newFeed
    });
  } catch (err) {
      next(err);
  }
};

// Get newfeed
exports.getNewFeeds = async (req, res, next) => {
  
  try {
    const newFeed = await Newsfeed.findByPk(req.params.id);

    if(!newFeed) {
      return  next(
          new ErrorResponse(`Newsfeed not found with id of ${req.params.id}`, 404)
      );
    }

      res.status(200).json({
        success: true,
        data: newFeed 
      });

  } catch (err) {
      next(err);
  }
};

// Update user
exports.updateNewFeed = async (req, res, next) => {
  const id = req.params.id;
  const newFeed = await Newsfeed.findByPk(req.params.id);
  try {
    
  if(!newFeed) {
    return  next(
        new ErrorResponse(`Newsfeed not found with id of ${req.params.id}`, 404)
    );
  }

  await Newsfeed.update({
    title: req.body.title,
    text: req.body.text,

  }, { where: {id: id} })
                                         
  res.status(200).json({success: true, data: req.body});

  } catch (err) {
    next(err);
  }
};


// Delete user
exports.deleteNewFeed = async (req, res, next) => {
  const id = req.params.id;
  const newFeed = await Newsfeed.findByPk(req.params.id);
  try {

    if(!newFeed) {
      return  next(
          new ErrorResponse(`Newsfeed not found with id of ${req.params.id}`, 404)
      );
    }

    await Newsfeed.destroy({
      where: { id: id }
    })
 
    res.status(200).json({success: true, data: {}});

  } catch (err) {
    next(err);
  }
};
