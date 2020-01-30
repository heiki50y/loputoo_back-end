const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const Hinnanguleht = db.hinnanguleht;
const Op = db.Sequelize.Op;

// Create new hinnaguleht
exports.createHinnanguleht = async (req, res, next) => {
  try {
    const hinnaguleht = await Hinnanguleht.create(req.body);

      res.status(201).json({
          success: true,
          data: hinnaguleht
      });
  } catch (err) {
      next(err)
  }
};

// Get all hinnaguleht
exports.getAllHinnaguleht = async (req, res, next) => {

  try {
    const hinnanguleht = await Hinnaguleht.findAll();

    res.status(200).json({ 
      success: true, 
      count: hinnanguleht.length, 
      data: hinnanguleht
    });
  } catch (err) {
      next(err);
  }
};

// Get hinnaguleht
exports.getHinnaguleht = async (req, res, next) => {
  
  try {
    const hinnaguleht = await Hinnanguleht.findByPk(req.params.id);

    if(!hinnaguleht) {
      return  next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }

      res.status(200).json({
        success: true,
         data: hinnaguleht 
      });

  } catch (err) {
      next(err);
  }
};

// Update hinnaguleht
exports.updateHinnaguleht = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    

    // await User.update(req.body, {
    //   where: { id: id }
    // })

    await Hinnaguleht.update(
      {fileName: req.body.fileName},
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

// Delete hinnaguleht
exports.deleteHinnaguleht = async (req, res, next) => {
  const id = req.params.id;

  try {

    await Hinnaguleht.destroy({
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
