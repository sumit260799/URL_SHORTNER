const mongoose = require("mongoose");

// Define the schema
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model from the schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
