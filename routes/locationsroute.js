const express = require("express");
const { body, validationResult } = require("express-validator");

const crudRepository = require("../database/crudrepository.js");

crudRepository.connect();

let locations = express.Router();

// GET all
locations.get("/", async (req, res) => {
  try {
    res.send(await crudRepository.findAll());
  } catch (err) {
    console.log(err);
  }
});

// POST one
locations.post(
  "/",
  body("latitude").isFloat({ min: 50.0, max: 90.0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body);
      let addedLocation = await crudRepository.save(req.body);
      console.log(addedLocation);
      let fullUrl =
        req.protocol +
        "://" +
        req.get("host") +
        req.originalUrl +
        addedLocation.id;
      res.location(fullUrl);
      res.status(201);
      res.send(addedLocation.dataValues);
    } catch (err) {
      console.log(err);
    }
  }
);

// Find one
locations.get("/:urlId([0-9]+)", async (req, res) => {
  let location = await crudRepository.findById(req.params.urlId);
  if (location === undefined) {
    res.status(404);
    res.end();
  } else {
    res.send(location);
  }
});

// DELETE one
locations.delete("/:urlId([0-9]+)", async (req, res) => {
  await crudRepository.deleteById(req.params.urlId);
  res.send({});
});

module.exports = locations;
