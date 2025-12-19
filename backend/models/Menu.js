const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,      // Display name of menu item
  path: String,      // Route path
});

module.exports = mongoose.model("Menu", menuSchema);
