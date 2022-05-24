const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const genresRoute = require("./routes/genres");
const helmet = require("helmet");
/* Middle wares */
app.use(helmet());
app.use(express.json());
app.use(genresRoute);
app.use(express.static("public"));





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
