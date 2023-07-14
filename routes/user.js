const express = require("express");
const router = express.Router();
const { userSignup, userLogin } = require("../controllers/signup");
router.post("/", userSignup);
router.post("/login", userLogin);

module.exports = router;
