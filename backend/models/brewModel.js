const mongoose = require('mongoose');

const brewSchema = new mongoose.Schema({
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

const Brew = mongoose.model('Brew', brewSchema);
module.exports = Brew;
