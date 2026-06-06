const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  date: Date,
  image: String
});

module.exports = mongoose.model("Workshop", workshopSchema);