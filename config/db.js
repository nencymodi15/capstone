const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGODB_URL");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("sucessfully connected");
  } catch (error) {
    console.log("error in connecting the mongo");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
