// bolt.js

const mongoose = require("mongoose");

const boltSchema = new mongoose.Schema({
  boltType: {
    type: String,
    required: true,
  },
  partNo: String,
  standard: String,
  certification: String,
  surfaceFinish: String,
  brand: String,
  industryStandard: String,
  material: String,
  threadSize: String,
  length: String,
  description: String,
});

const Bolt = mongoose.model("Bolt", boltSchema);

module.exports = Bolt;
