const mongoose = require("mongoose");

const mdbUrl = "mongodb://localhost:27017/bdroppy";

const initDB = () => {
  mongoose.connect(mdbUrl, { useNewUrlParser: true });

  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });
};

module.exports = initDB;