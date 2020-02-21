const db = require("../models");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/email');
const Studentdoc = db.studentdocs;

const Op = db.Sequelize.Op;

// Create Student Document 
exports.createStudentDoc = async (req, res, next) => {
    try {
      req.body.userId = req.user.id

      // Check published student document
      const publishedStudentDoc = await Studentdoc.findOne({ where: { userId: req.user.id }})

      // // Student can add only one document
      if(publishedStudentDoc && req.user.role != 'admin') {
        return next(new ErrorResponse('Student has already published a document', 400));
      }

      const studentDoc = await Studentdoc.create(req.body);

      res.status(201).json({
        success: true,
        data: studentDoc
      });
    } catch (err) {
      next(err)
    }
};
  
// Get all student documents
exports.getAllStudentDoc = async (req, res, next) => {
  try {
    const student = await Studentdoc.findAll();

    res.status(200).json({ 
      success: true, 
      count: student.length, 
      data: student
    });
  } catch (err) {
      next(err);
  }
};

// Get student document
exports.getStudentDoc = async (req, res, next) => {
  try {
    const student = await Studentdoc.findByPk(req.params.id);

    if(!student) {
      return  next(
          new ErrorResponse(`Student document not found with id of ${req.params.id}`, 404)
      );
    }

    if(student.userId.toString() != req.user.id && req.user.role != 'admin') {
      return  next(
        new ErrorResponse(`Student is not authorized to get this document`, 401)
      );
    }

      res.status(200).json({
        success: true,
        data: student 
      });

  } catch (err) {
      next(err);
  }
};

// Update student document
exports.updateStudentDoc = async (req, res, next) => {
  const id = req.params.id;
  const student = await Studentdoc.findByPk(req.params.id);
  try {
    
    if(!student) {
      return  next(
          new ErrorResponse(`Student document not found with id of ${req.params.id}`, 404)
      );
    }

    if(student.userId.toString() != req.user.id && req.user.role != 'admin') {
      return  next(
        new ErrorResponse(`Student is not authorized to update this document`, 401)
      );
    }

    await Studentdoc.update({
      eriala_valdkond: req.body.eriala_valdkond,
      opilase_nimi: req.body.opilase_nimi,
      praktika_email: req.body.email,
      praktika_periood: req.body.praktika_periood,
      prakika_maht: req.body.prakika_maht,
      praktika_email: req.body.praktika_email
      
    }, { where: {id: id} })
                                          
    res.status(200).json({success: true, data: req.body});

  } catch (err) {
    next(err);
  }
};

// Delete student document
exports.deleteStudentDoc = async (req, res, next) => {
  const id = req.params.id;
  const student = await Studentdoc.findByPk(req.params.id);
  try {

    if(!student) {
      return  next(
          new ErrorResponse(`Student document not found with id of ${req.params.id}`, 404)
      );
    }

    if(student.userId.toString() != req.user.id && req.user.role != 'admin') {
      return  next(
        new ErrorResponse(`Student is not authorized to update this document`, 401)
      );
    }

    await Studentdoc.destroy({
      where: { id: id }
    })
 
    res.status(200).json({success: true, data: {}});

  } catch (err) {
    next(err);
  }
};
