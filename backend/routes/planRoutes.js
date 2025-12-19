const express = require("express");
const router = express.Router();
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/", verifyToken, isAdmin, createPlan);
router.get("/", getPlans);
router.put("/:id", verifyToken, isAdmin, updatePlan);
router.delete("/:id", verifyToken, isAdmin, deletePlan);

module.exports = router;
