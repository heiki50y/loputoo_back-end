const db = require("../models");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/email');
const Studentdoc = db.studentdocs;

const Op = db.Sequelize.Op;

// Create Student Document 
exports.createStudentDoc = async (req, res, next) => {
    try {
      req.body.userId = req.user.id
     
      const studentDoc = await Studentdoc.create(req.body);

      // Check published student document
      const publishedStudentDoc = await Studentdoc.findOne({ where: { userId: req.user.id }})

      // // Student can add only one document
      if(publishedStudentDoc && req.user.role !== 'admin') {
        return next(new ErrorResponse('The user has already published a document', 400));
      }


      res.status(201).json({
        success: true,
        data: studentDoc
      });
    } catch (err) {
      next(err)
    }
};
  

//   sendEmail({
//     email: req.body.praktika_email,
//     subject: `Praktikadokumendid õpilane: ${req.body.opilase_nimi}`,
//     text: `Õpilase poolsed anmded praktikatautluses
//     Eriala/valdkond: ${req.body.eriala_valdkond}
//     Õpilase nimi: ${req.body.opilase_nimi}
//     Praktikaperiood: ${req.body.praktika_periood}
//     Praktika maht astronoomilistes tundides EKAP-tes: ${req.body.prakika_maht}
//     id ${req.params.id}`
//   });
  

// Retrieve all Practicedocs from the database.
exports.getAllStudentDoc = (req, res) => {
  const title = req.query.eriala;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Studentdoc.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving practicedocs."
      });
    });
};

// Find a single Practicedoc with an id
exports.getStudentDoc = (req, res) => {
  const id = req.params.id;

  Studentdoc.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Practicedoc with id=" + id
      });
    });
};

exports.sendDoc = (req, res) => {
  const id = req.params.id;

  Studentdoc.findByPk(req.body, {
    where: { id: id }
  })

  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Practicedoc with id=" + id
    });
  });

  sendEmail({
    email: req.body.praktika_email,
    subject: `Praktikadokumendid õpilane: ${req.body.opilase_nimi}`,
    text: `Õpilase poolsed anmded praktikatautluses
    Eriala/valdkond: ${req.body.eriala_valdkond}
    Õpilase nimi: ${req.body.opilase_nimi}
    Praktikaperiood: ${req.body.praktika_periood}
    Praktika maht astronoomilistes tundides EKAP-tes: ${req.body.prakika_maht}
    id ${req.params.id}`
  });
}

// Update a Practicedoc by the id in the request
exports.updateStudentDoc = (req, res) => {
  const id = req.params.id;

  Studentdoc.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Practicedoc was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Practicedoc with id=${id}. Maybe Practicedoc was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Practicedoc with id=" + id
      });
    });
};

// Delete a Practicedoc with the specified id in the request
exports.deleteStudentDoc = (req, res) => {
  const id = req.params.id;

  Studentdoc.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Practicedoc was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Practicedoc with id=${id}. Maybe Practicedoc was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Practicedoc with id=" + id
      });
    });
};
