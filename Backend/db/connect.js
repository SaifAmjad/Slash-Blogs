const Mongoose = require("mongoose");

const uri='mongodb+srv://saifamjad00:0033saif@blogcluster.laiciow.mongodb.net/slashblogs?retryWrites=true&w=majority'

const connectDB = () => {
  Mongoose.connect(uri)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
