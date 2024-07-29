const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  deadline:{
    type: String,
  },
  budget:{
    type:String,
  },
  status: {
    type: String,
    enum: ["available", "applied", "allocated", "completed"],
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as necessary
});

module.exports = mongoose.model("Gig", gigSchema);
