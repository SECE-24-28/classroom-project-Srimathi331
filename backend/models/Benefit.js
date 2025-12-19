const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // store icon name like "AiOutlineClockCircle"
}, { timestamps: true });

module.exports = mongoose.model("Benefit", benefitSchema);
