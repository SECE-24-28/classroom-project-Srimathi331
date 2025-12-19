const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  planName: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  validity: { type: Number, required: true }, // in days
  description: { type: String, required: true },
});

module.exports = mongoose.model("Plan", planSchema);
