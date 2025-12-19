const Menu = require("../models/Menu");

// GET all menu items
exports.getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: create menu items (admin)
exports.createMenu = async (req, res) => {
  try {
    const items = req.body; // expect array of {name, path}
    const created = await Menu.insertMany(items);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
