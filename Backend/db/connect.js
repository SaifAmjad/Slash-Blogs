const Mongoose = require("mongoose");

const connectDB = (uri) => {
  Mongoose.connect(uri)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
