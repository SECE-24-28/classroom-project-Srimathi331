const mongoose = require("mongoose");

const dthPlanSchema = new mongoose.Schema(
  {
    operator: {
      type: Number,   // ✅ MUST be Number
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
  },
  {
    collection: "dthplans", // ✅ force correct collection
  }
);

module.exports = mongoose.model("DTHPlan", dthPlanSchema);
