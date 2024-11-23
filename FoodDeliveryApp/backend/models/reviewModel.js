const mongoose = require("mongoose");
const Restaurant = require("./restaurantModel"); // Reference to the Restaurant schema
const User = require("./userModel"); // Reference to the User schema  

const reviewSchema = mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",  // Reference to the Restaurant model
    required: true, // Every review must be tied to a restaurant
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model (who wrote the review)
    required: true, // Every review must be written by a user
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true, // Rating is mandatory and should be between 1 and 5
  },
  reviewText: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Timestamp when the review was created
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
