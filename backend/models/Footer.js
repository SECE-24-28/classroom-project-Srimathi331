const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  links: [
    {
      name: String,
      url: String,
    },
  ],
  socialMedia: [
    {
      platform: String, // e.g., "facebook", "twitter", "instagram"
      url: String,
    },
  ],
});

module.exports = mongoose.model("Footer", footerSchema);
