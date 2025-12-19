const express = require("express");
const router = express.Router();
const { getOffers, createOffer } = require("../controllers/offerController");

// Public GET
router.get("/", getOffers);

// Optional POST for admin
router.post("/", createOffer);

module.exports = router;
