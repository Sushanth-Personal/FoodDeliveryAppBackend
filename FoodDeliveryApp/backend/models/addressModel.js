const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link address to a specific user
  state: { type: String },
  city: { type: String },
  pinCode: { type: String },
  phoneNumber: { type: String },
  fullAddress: { type: String },
  isDefault: { type: Boolean, default: false }, // Track default address
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
