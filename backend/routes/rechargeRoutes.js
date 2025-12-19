const express = require("express");
const router = express.Router();

const { createRecharge, getMyRecharges, getAllRecharges ,} = require("../controllers/rechargeController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Create recharge (User)
router.post("/", verifyToken, createRecharge);

// Get logged-in user's recharges
router.get("/my", verifyToken, getMyRecharges);

// Get all recharges (Admin)
router.get("/", verifyToken, isAdmin, getAllRecharges);

module.exports = router;