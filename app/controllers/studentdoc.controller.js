const db = require("../models");
const sendEmail = require('../utils/email');
const Studentdoc = db.studentdocs;
const Op = db.Sequelize.Op;

// Create and Save a new Practicedoc
exports.createDoc = (req, res) => {
  // Validate request
  if (!req.body.eriala_valdkond) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Practicedoc
  const studentdoc = {
    
    eriala_valdkond: req.body.eriala_valdkond,
    opilase_nimi: req.body.opilase_nimi,
    praktika_periood: req.body.praktika_periood,
    prakika_maht: req.body.prakika_maht,
    praktika_email: req.body.praktika_email
    
  };

  // Save Practicedoc in the database
  // sendEmail({
  //   email: req.body.praktika_email,
  //   subject: `Praktikadokumendid õpilane: ${req.body.opilase_nimi}`,
  //   text: `Õpilase poolsed anmded praktikatautluses
  //   Eriala/valdkond: ${req.body.eriala_valdkond}
  //   Õpilase nimi: ${req.body.opilase_nimi}
  //   Praktikaperiood: ${req.body.praktika_periood}
  //   Praktika maht astronoomilistes tundides EKAP-tes: ${req.body.prakika_maht}
  //   id ${req.body.id}`
  // });

  Studentdoc.create(studentdoc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Practicedoc."
      });

      console.log(data);
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
  
};

// Retrieve all Practicedocs from the database.
exports.findAllDoc = (req, res) => {
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
exports.findOneDoc = (req, res) => {
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
exports.updateDoc = (req, res) => {
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
exports.deleteDoc = (req, res) => {
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
