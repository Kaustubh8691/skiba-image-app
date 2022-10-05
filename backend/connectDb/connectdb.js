const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose.connect(url);
    console.log("db connected")
};

module.exports = connectDB;



