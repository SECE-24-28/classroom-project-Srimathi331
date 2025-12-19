const Recharge = require("../models/Recharge");
const Plan = require("../models/Plan");        // MOBILE plans
const DTHPlan = require("../models/DTHPlan");  // DTH plans

// ===================================================
// CREATE RECHARGE (MOBILE + DTH)
// ===================================================
exports.createRecharge = async (req, res) => {
  try {
    const {
      plan: planId,
      mobileNumber,
      subscriberId,
      operator,
      type,
      amount,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVV,
      upiID,
      bank,
      bankUserID,
    } = req.body;

    // ---------------- BASIC VALIDATION ----------------
    if (!planId || !amount || !paymentMethod || !type) {
      return res.status(400).json({ message: "Missing recharge details" });
    }

    // ---------------- MOBILE VALIDATION ----------------
    if (type === "MOBILE") {
      if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
        return res.status(400).json({ message: "Invalid mobile number" });
      }
    }

    // ---------------- DTH VALIDATION ----------------
    if (type === "DTH") {
      if (!subscriberId || !operator) {
        return res.status(400).json({ message: "Invalid DTH details" });
      }
    }

    // ---------------- FETCH CORRECT PLAN ----------------
    let selectedPlan;

    if (type === "MOBILE") {
      selectedPlan = await Plan.findById(planId);
    } else if (type === "DTH") {
      selectedPlan = await DTHPlan.findById(planId);
    } else {
      return res.status(400).json({ message: "Invalid recharge type" });
    }

    if (!selectedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // ---------------- AMOUNT SAFETY CHECK ----------------
    if (Number(amount) !== Number(selectedPlan.price)) {
      return res.status(400).json({ message: "Amount mismatch" });
    }

    // ---------------- PAYMENT VALIDATION ----------------
    let paymentInfo = {};

    if (paymentMethod === "CARD") {
      if (!cardNumber || !cardExpiry || !cardCVV) {
        return res.status(400).json({ message: "Card details required" });
      }
      paymentInfo = {
        cardLast4: cardNumber.slice(-4),
        cardExpiry,
      };
    } 
    else if (paymentMethod === "UPI") {
      if (!upiID || !upiID.includes("@")) {
        return res.status(400).json({ message: "Valid UPI ID required" });
      }
      paymentInfo = { upiHandle: upiID };
    } 
    else if (paymentMethod === "NETBANKING") {
      if (!bank || !bankUserID) {
        return res.status(400).json({ message: "Bank details required" });
      }
      paymentInfo = { bankName: bank, bankUserID };
    } 
    else {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // ---------------- CREATE RECHARGE ----------------
    const recharge = await Recharge.create({
      user: req.user.id,
      plan: selectedPlan._id,
      mobileNumber: type === "MOBILE" ? mobileNumber : undefined,
      subscriberId: type === "DTH" ? subscriberId : undefined,
      operator: type === "DTH" ? operator : undefined,
      type,
      amount,
      paymentMethod,
      paymentInfo,
      status: "success",
      transactionId: "TXN" + Date.now(),
    });

    await recharge.populate("plan", "planName price validity");

    res.status(201).json({
      message: "Recharge successful",
      recharge,
    });

  } catch (error) {
    console.error("Recharge Error:", error);
    res.status(500).json({ message: "Recharge failed" });
  }
};
// ===================================================
// GET LOGGED-IN USER RECHARGES
// ===================================================
exports.getMyRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find({ user: req.user.id })
      .populate("plan");        // Fix: Populate plan

    res.json(recharges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ===================================================
// ADMIN: GET ALL RECHARGES
// ===================================================
exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .populate("plan")          //Fix: Populate plan
      .populate("user", "name email"); // optional: populate user info

    res.json(recharges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};