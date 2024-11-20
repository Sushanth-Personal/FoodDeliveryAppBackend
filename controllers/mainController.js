const express = require("express");
const mongoose = require("mongoose");

const getCart = async (req, res) => {
  const { userId, restaurantId } = req.params;

  try {
    // Validate input (ensure `userId` and `restaurantId` are valid ObjectId formats if applicable)
    if (!userId || !restaurantId) {
      return res
        .status(400)
        .json({ error: "User ID and Restaurant ID are required." });
    }

    // Fetch the cart for the given user and restaurant
    const cart = await Cart.findOne({
      userId,
      restaurantId,
    }).populate({
      path: "items.productId", // Populate product details
      select: "productName price productImageSmall", // Include specific fields
    });

    // If no cart is found, return a 404 error
    if (!cart) {
      return res
        .status(404)
        .json({
          error: "Cart not found for the given user and restaurant.",
        });
    }

    // Respond with the cart data
    res.status(200).json(cart);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching cart:", error.message);

    // Differentiate between validation errors and server errors if needed
    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ error: "Invalid User ID or Restaurant ID format." });
    }

    // Handle unexpected server errors
    res
      .status(500)
      .json({
        error:
          "An unexpected error occurred while fetching the cart.",
      });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate input (ensure `userId` is a valid ObjectId format if applicable)
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Validate if the `userId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ error: "Invalid User ID format." });
    }

    // Fetch the user by ID, excluding cart details
    const user = await User.findById(userId, "-cart"); // Exclude 'cart' field using projection

    // If no user is found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching user:", error.message);

    // Handle server errors
    res
      .status(500)
      .json({
        error:
          "An unexpected error occurred while fetching the user.",
      });
  }
};

const getReview = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    // Validate restaurantId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res
        .status(400)
        .json({ error: "Invalid Restaurant ID format." });
    }

    // Fetch all reviews for the specified restaurant
    const reviews = await Review.find({ restaurantId })
      .populate({
        path: "userId",
        select: "userName userImageSmall country ",
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    // Check if reviews exist
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this restaurant." });
    }

    // Return reviews
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching reviews." });
  }
};

module.exports = {
  getCart,
  getUser,
  getReview,
};
