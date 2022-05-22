const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const Joi = require("joi");
function validateCourse(course) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
}

app.use(express.json());
const genres = [
  { id: 1, name: "Thriller" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Bildungsroman" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = genres.find((c) => c.id === id);
  if (!course)
    res.status(404).send("The course with the given id was not found!");
  res.send(course);
});

app.post("/api/genres", (req, res) => {
  const isExist = genres.find((c) => c.name === req.body.name);
  const result = validateCourse(req.body);
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

  genres.push(course);
  res.status(200).send(course);
});

app.put("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  const result = validateCourse(req.body);
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

app.delete("/api/genres/:id", (req, res) => {
  const course = genres.find((c) => c.id === parseInt(req.params.id));
  const result = validateCourse(req.body);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
