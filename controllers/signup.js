const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    console.log(name);
    if (existUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(201).redirect("/");
  } catch (error) {
    return res.status(500).json({ error: "Sign Up Again" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).redirect("/login");
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({ error: "Log In Again" });
  }
};

module.exports = { userSignup, userLogin };
