const mongoose = require("mongoose");

const popularPlanSchema = new mongoose.Schema({
  planName: String,
  price: Number,
  details: String,
});

module.exports = mongoose.model("PopularPlan", popularPlanSchema);
