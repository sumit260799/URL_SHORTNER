const express = require("express");
const URL = require("../models/model");
const router = express.Router();
const { postURL, getURL } = require("../controllers/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("../middleware/auth");
router.get("/signup", (req, res) => {
  res.render("usersignup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
// Logout route
router.post("/logout", (req, res) => {
  // Clear the cookie by setting it to an empty value and expiring it immediately
  res.clearCookie("uid");

  // Redirect to the login page or any other desired page
  res.redirect("/login");
});

router.post("/post", restrictToLoggedInUserOnly, postURL);

router.get("/:shortURL", getURL);

router.get("/", checkAuth, async (req, res) => {
  try {
    let findUrl = [];
    // if (!req.user) return res.redirect("/login");
    if (req.user) {
      findUrl = await URL.find({ createdBy: req.user._id });
    }
    return res.render("home", { findUrl });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
