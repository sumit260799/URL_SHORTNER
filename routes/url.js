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
  res.clearCookie("uid");
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

router.post("/delete", async (req, res) => {
  const idToDelete = req.body.id; // Get the ID of the URL item to delete

  try {
    const deletedItem = await URL.findByIdAndDelete(idToDelete);
    // console.log("Data deleted successfully:", deletedItem);
  } catch (error) {
    console.log("Error deleting data:", error);
  }

  res.redirect("/");
});

module.exports = router;
