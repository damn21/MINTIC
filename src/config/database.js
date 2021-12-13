const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
    // Connecting to the database
    mongoose.connect(MONGO_URI, () => {
        console.log("CONNECTED TO MONGODB");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  };