const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel");

const cartSchema = mongoose.Scheme({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      productName: { type: String, default: "" },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;