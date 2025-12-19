const Benefit = require("../models/Benefit");

// GET all benefits
exports.getBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find();
    res.status(200).json(benefits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new benefit (optional, for admin)
exports.createBenefit = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const benefit = await Benefit.create({ title, description, icon });
    res.status(201).json(benefit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
