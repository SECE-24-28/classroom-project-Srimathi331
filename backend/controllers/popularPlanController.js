const PopularPlan = require("../models/PopularPlan");

// GET all popular plans
exports.getPopularPlans = async (req, res) => {
  try {
    const plans = await PopularPlan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
