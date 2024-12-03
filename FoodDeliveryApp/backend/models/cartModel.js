const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel");
const Restaurant = require("./restaurantModel");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  productName: { type: String, default: "" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
