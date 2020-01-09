const db = require("../models");
const Document = db.documents;
const Op = db.Sequelize.Op;

// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Document
  const document = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Document in the database
  Document.create(document)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document."
      });
    });
};

// Retrieve all Documents from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Document.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving documents."
      });
    });
};

// Find a single Document with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Document.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + id
      });
    });
};

// Update a Document by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Document.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Document with id=" + id
      });
    });
};

// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Document.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id
      });
    });
};

// Delete all Documents from the database.
exports.deleteAll = (req, res) => {
  Document.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Documents were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all documents."
      });
    });
};

// find all published Document
exports.findAllPublished = (req, res) => {
  Document.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving documents."
      });
    });
};
