const express = require("express");
const validator = require("../helpers/validation");
const router = express.Router();

const genres = [
  { id: 1, name: "Thriller" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Bildungsroman" },
];

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/api/genres", (req, res) => {
  res.send(genres);
});

router.get("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = genres.find((c) => c.id === id);
  if (!course)
    res.status(404).send("The course with the given id was not found!");
  res.send(course);
});

router.post("/api/genres", (req, res) => {
  const isExist = genres.find((c) => c.name === req.body.name);
  const result = validator(req.body);
  if (result.error) {
    res.send(result.error.details[0].message);
    return;
  }
  if (isExist) {
    res.status(409).send("The course with the given name already exists");
    return;
  }
  const course = {
    id: genres.length + 1,
    name: req.body.name,
  };

  router.push(course);
  res.status(200).send(course);
});

router.put("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  const result = validator(req.body);
  if (!course) {
    res.sendStatus(404).send("Course not found");
    return;
  }
  if (result.error) {
    res.sendStatus(400).send(result.error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

router.delete("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  const result = validator(req.body);
  if (!course) {
    res.sendStatus(404).send("Course not found");
    return;
  }
  if (result.error) {
    res.sendStatus(400).send(result.error.details[0].message);
    return;
  }
  const index = genres.indexOf(course);
  genres.splice(index, 1);
  res.send(course);
});

module.exports = router;
