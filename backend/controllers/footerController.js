const Footer = require("../models/Footer");

// GET footer data
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: "Footer data not found" });
    res.status(200).json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: create footer (admin)
exports.createFooter = async (req, res) => {
  try {
    const { links, socialMedia } = req.body;
    const footer = await Footer.create({ links, socialMedia });
    res.status(201).json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
