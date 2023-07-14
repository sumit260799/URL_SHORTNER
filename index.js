const express = require("express");

const app = express();
require("dotenv").config();
require("./db/connection");
const port = process.env.PORT || 6000;
const URL = require("./models/model");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userRoutes = require("./routes/url");
app.use(userRoutes);
app.get("/", (req, res) => {
  res.render("home");
});
const shortid = require("shortid");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
