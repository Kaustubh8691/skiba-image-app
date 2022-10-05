const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String,
  email:String
});

module.exports = User = mongoose.model("User", user);