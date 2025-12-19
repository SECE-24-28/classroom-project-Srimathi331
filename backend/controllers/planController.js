const Plan = require("../models/Plan");

// Create a new plan (Admin only)
exports.createPlan = async (req, res) => {
  try {
    const { planName, price, validity, description } = req.body;

    if (!planName || !price || !validity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const plan = await Plan.create({
      planName,
      price,
      validity,
      description,
    });

    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a plan (Admin only)
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    res.json({ message: "Plan updated", plan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a plan (Admin only)
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    res.json({ message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
