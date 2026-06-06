const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: String,
  location: String,
  image: String,
  date: Date
});

module.exports = mongoose.model("Event", eventSchema);