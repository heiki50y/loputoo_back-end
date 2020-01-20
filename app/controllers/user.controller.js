const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Practicedoc
exports.createUser = (req, res) => {
  
  // Create a Practicedoc
  const user = req.body

  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all Practicedocs from the database.
exports.getAllUsers = (req, res) => {
  const title = req.query.email;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving."
      });
    });
};

exports.getUser = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
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
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Practicedoc with id=${id}. Maybe Practicedoc was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a Practicedoc with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe Practicedoc was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Practicedoc with id=" + id
      });
    });
};
