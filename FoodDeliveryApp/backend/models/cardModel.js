const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      minlength: 16,
      maxlength: 16,
      validate: {
        validator: function (v) {
          return /^\d{16}$/.test(v); // Validate card number as exactly 16 digits
        },
        message: "Card number must be exactly 16 digits.",
      },
    },
    expiry: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(v); // Validate expiry as MM/YY or MM/YYYY
        },
        message: "Expiry date must be in MM/YY or MM/YYYY format.",
      },
    },
    cvv: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 4,
      validate: {
        validator: function (v) {
          return /^\d{3,4}$/.test(v); // Validate CVV as 3-4 digits
        },
        message: "CVV must be 3 or 4 digits.",
      },
    },
    nameOnCard: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
