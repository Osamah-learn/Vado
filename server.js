const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const genresRoute = require("./routes/genres");
const helmet = require("helmet");
var morgan = require("morgan");
const debug = require("debug")("app:startup");
const config = require("config");
/* Configrations */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  /* Export DEBUG=app:start or any file name we want */
  debug("Morgan enabled development...");
}

console.log("Application Name: " + config.get("name"));
/* Middle wares */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(genresRoute);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
