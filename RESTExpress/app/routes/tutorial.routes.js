
const router = require("express").Router();
const tutorials = require("../controllers/tutorial.controller.js");

// Create a new Tutorial
router.post("/tutorials", tutorials.create);

// Retrieve all Tutorials
router.get("/tutorials", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/tutorials/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/tutorials/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/tutorials/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/tutorials/:id", tutorials.delete);

// Delete all Tutorials
router.delete("/tutorials", tutorials.deleteAll);

module.exports = router;
