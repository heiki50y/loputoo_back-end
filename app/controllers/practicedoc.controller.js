const db = require("../models");
const Practicedoc = db.practicedocs;
const Op = db.Sequelize.Op;

// Create and Save a new Practicedoc
exports.create = (req, res) => {
  // Validate request
  if (!req.body.praktika_ettevote) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Practicedoc
  const practicedoc = {
    
    praktika_ettevote: req.body.praktika_ettevote,
    praktika_telefon: req.body.praktika_telefon,
    praktika_email: req.body.praktika_email,
    juriidiline_aadress: req.body.juriidiline_aadress,
    lepingusolmija_nimi: req.body.lepingusolmija_nimi,
    lepingusolmija_amet: req.body.lepingusolmija_amet,
    lepingu_alus: req.body.lepingu_alus,
    juhendaja_nimi: req.body.juhendaja_nimi,
    juhendaja_amet: req.body.juhendaja_amet,
    juhendaja_telefon: req.body.juhendaja_telefon
    
  };

  // Save Practicedoc in the database
  Practicedoc.create(practicedoc)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Practicedoc."
      });
    });
};

// Retrieve all Practicedocs from the database.
exports.findAll = (req, res) => {
  const title = req.query.eriala;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Practicedoc.findAll({ where: condition })
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
exports.findOne = (req, res) => {
  const id = req.params.id;

  Practicedoc.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Practicedoc with id=" + id
      });
    });
};

// Update a Practicedoc by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Practicedoc.update(req.body, {
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
exports.delete = (req, res) => {
  const id = req.params.id;

  Practicedoc.destroy({
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

// Delete all Practicedocs from the database.
exports.deleteAll = (req, res) => {
  Practicedoc.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Practicedocs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all practicedocs."
      });
    });
};

// find all published Practicedoc
exports.findAllPublished = (req, res) => {
  Practicedoc.findAll({ where: { published: true } })
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
