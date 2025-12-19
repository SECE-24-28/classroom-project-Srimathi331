const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Can be Mobile Plan OR DTH Plan
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    // MOBILE only
    mobileNumber: {
      type: String,
      required: function () {
        return this.type === "MOBILE";
      },
    },

    // DTH only
    subscriberId: {
      type: String,
      required: function () {
        return this.type === "DTH";
      },
    },

    operator: {
      type: String,
      required: function () {
        return this.type === "DTH";
      },
    },

    // MOBILE or DTH
    type: {
      type: String,
      enum: ["MOBILE", "DTH"],
      default: "MOBILE",
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI", "NETBANKING"],
      required: true,
    },

    paymentInfo: {
      cardLast4: String,
      cardExpiry: String,
      upiHandle: String,
      bankName: String,
      bankUserID: String,
    },

    transactionId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);