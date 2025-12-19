const express = require("express");
const router = express.Router();
const { getMenu, createMenu } = require("../controllers/menuController");

router.get("/", getMenu);
router.post("/", createMenu); // optional for admin

module.exports = router;
