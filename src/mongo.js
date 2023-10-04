const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/react-login-tut")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const flightSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Flight = mongoose.model("Flight", flightSchema);

module.exports = {
  User,
  Flight,
};
