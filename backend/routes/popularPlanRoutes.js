const express = require("express");
const router = express.Router();
const { getPopularPlans } = require("../controllers/popularPlanController");

router.get("/", getPopularPlans);

module.exports = router;
