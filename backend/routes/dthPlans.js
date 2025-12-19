const express = require("express");
const router = express.Router();
const DTHPlan = require("../models/DTHPlan");

// =================== GET all DTH plans (optionally by operator) ===================
router.get("/", async (req, res) => {
  try {
    let filter = {};

    // If operator query is provided, convert to number to match DB
    if (req.query.operator) {
      filter.operator = Number(req.query.operator);
    }

    // Fetch plans from DB
    const plans = await DTHPlan.find(filter);

    // Debug logs
    console.log("Operator query received:", req.query.operator);
    console.log("Filter applied:", filter);
    console.log("Plans found:", plans);

    res.json(plans);
  } catch (error) {
    console.error("Error loading plans:", error);
    res.status(500).json({ message: "Error loading plans" });
  }
});

// =================== POST a new DTH plan ===================
router.post("/", async (req, res) => {
  try {
    let { operator, planName, price, validity } = req.body;

    if (!operator || !planName || !price || !validity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure operator is a number to match database type
    operator = Number(operator);

    const newPlan = await DTHPlan.create({ operator, planName, price, validity });
    console.log("New plan created:", newPlan);

    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Error creating plan" });
  }
});

module.exports = router;
