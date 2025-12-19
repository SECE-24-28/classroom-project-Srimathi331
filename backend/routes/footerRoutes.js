const express = require("express");
const router = express.Router();
const { getFooter, createFooter } = require("../controllers/footerController");

// Public GET
router.get("/", getFooter);

// Optional POST for admin
router.post("/", createFooter);

module.exports = router;
