const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Db");
  } catch (error) {
    console.error("Failed connecting to Db");
    process.exit(1);
  }
};
module.exports = connectToDb;
