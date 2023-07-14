const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const path = require("path");

const port = 5000;

const staticRouter = require("./routes/url");
const userRouter = require("./routes/user");
require("dotenv").config();
require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set("views", path.resolve("./views"));

app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
