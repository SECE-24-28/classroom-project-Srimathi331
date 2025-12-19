const express = require("express");
const router = express.Router();

const operators = [
  { id: 1, name: "Tata Sky" },
  { id: 2, name: "Dish TV" },
  { id: 3, name: "Airtel Digital TV" },
];

router.get("/", (req, res) => {
  const { type } = req.query;
  if (type === "DTH") {
    res.json(operators);
  } else {
    res.status(404).json({ error: "Type not found" });
  }
});

module.exports = router;
