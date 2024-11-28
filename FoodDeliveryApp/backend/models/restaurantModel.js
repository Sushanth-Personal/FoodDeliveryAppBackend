const mongoose = require("mongoose");
const Product = require("./productModel");
const Review = require("./reviewModel");

const restaurantSchema = mongoose.Schema({
  restaurantName: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
