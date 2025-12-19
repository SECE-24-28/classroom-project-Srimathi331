const express = require("express");
const router = express.Router();
const { getBenefits, createBenefit } = require("../controllers/benefitController");

// Public route to get benefits
router.get("/", getBenefits);

// Optional: admin route to add benefits
router.post("/", createBenefit);

module.exports = router;
