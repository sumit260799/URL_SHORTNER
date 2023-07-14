const express = require("express");
const URL = require("../models/model");
const router = express.Router();
const { postURL, getURL } = require("../controllers/user");
const { restrictToLoggedInUserOnly } = require("../middleware/auth");
router.get("/signup", (req, res) => {
  res.render("usersignup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/post", restrictToLoggedInUserOnly, postURL);

router.get("/:shortURL", getURL);

router.get("/", async (req, res) => {
  try {
    const findUrl = await URL.find({});
    return res.render("home", { findUrl: findUrl });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
