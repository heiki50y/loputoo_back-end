module.exports = app => {
  const practicedocs = require("../controllers/practicedoc.controller.js");

  var router = require("express").Router();

  // Create a new Practicedoc
  router.post("/", practicedocs.create);

  // Retrieve all Practicedocs
  router.get("/", practicedocs.findAll);

  // Retrieve all published Practicedocs
  router.get("/published", practicedocs.findAllPublished);

  // Retrieve a single Practicedoc with id
  router.get("/:id", practicedocs.findOne);

  // Update a Practicedoc with id
  router.put("/:id", practicedocs.update);

  // Delete a Practicedoc with id
  router.delete("/:id", practicedocs.delete);

  // Create a new Practicedoc
  router.delete("/", practicedocs.deleteAll);

  app.use('/api/practicedocs', router);
};
