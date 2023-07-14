const express = require("express");
const URL = require("../models/model");
const router = express.Router();
const { postURL, getURL } = require("../controllers/user");
router.post("/post", postURL);
router.get("/", async (req, res) => {
  const findUrl = await URL.find({});
  console.log(findUrl);
  res.render("home", { findUrl: findUrl });
});
router.get("/:shortURL", getURL);
module.exports = router;
