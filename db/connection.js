const mongoose = require("mongoose");
require("dotenv").config();
const dbURI = process.env.URL;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Additional code to run after successful connection
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
