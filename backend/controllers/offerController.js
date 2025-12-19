const Offer = require("../models/Offer");

// GET all offers
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional POST for admin
exports.createOffer = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const offer = await Offer.create({ title, desc });
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
