const shortid = require("shortid");
const URL = require("../models/model");

const postURL = async (req, res) => {
  const shortID = shortid();

  try {
    const newURL = new URL({
      shortURL: shortID,
      redirectURL: req.body.url,
      visitHistory: [],
    });
    await newURL.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save URL" });
  }
};

const getURL = async (req, res) => {
  try {
    const shortURL = req.params.shortURL;
    const result = await URL.findOne({ shortURL });
    if (!result) return res.sendStatus(404);
    result.clicks++;
    await result.save();
    res.redirect(result.redirectURL);
  } catch (error) {
    console.error("Error retrieving short URL:", error);
    res.sendStatus(500);
  }
};
module.exports = {
  postURL,
  getURL,
};
