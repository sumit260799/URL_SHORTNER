const express = require("express");
const URL = require("../models/model");
const router = express.Router();
const { postURL, getURL } = require("../controllers/user");
router.post("/post", postURL);

router.get("/:shortURL", getURL);
router.get("/", async (req, res) => {
  const findUrl = await URL.find({});
  res.render("home", { findUrl: findUrl });
});

module.exports = router;
