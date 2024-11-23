const mongoose = require("mongoose");
const Product = require("./productModel");
const Review = require("./reviewModel");

const restaurantSchema = mongoose.Schema({
  IconName: { type: String, required: true },
  BannerName: { type: String, required: true },
  iconImage: { type: String, required: true },
  bannerImage: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: {
    type: Number,
    default: 0,
    min: 0, // Ensure rating is at least 0
    max: 5, // Ensure rating does not exceed 5
  },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Reference to Product schema
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Review schema
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
