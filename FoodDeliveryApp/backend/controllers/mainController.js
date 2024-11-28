const express = require("express");
const mongoose = require("mongoose");
const Image = require("../models/imageModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Restaurant = require("../models/restaurantModel");
const Product = require("../models/productModel");
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

const getImage = async (req, res) => {  
  try {
    const { imageId,page,container,altText } = req.query;
    if(imageId){
      try{
        const image = await Image.findOne({ imageId });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        res.status(200).json(image);
      }catch(error){
        console.error("Error fetching image:", error.message);
        res
          .status(500)
          .json({ error: "An error occurred while fetching image by imageId." });
      }
    }
    else if(altText){
      try{
        const image = await Image.findOne({ altText });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        res.status(200).json(image);
      }catch(error){
        console.error("Error fetching image:", error.message);
        res
          .status(500)
          .json({ error: "An error occurred while fetching image by altText." });
      }
    }
    else if(container){
      try{
        const image = await Image.find({ container });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        res.status(200).json(image);
      }catch(error){
        console.error("Error fetching image:", error.message);
        res
          .status(500)
          .json({ error: "An error occurred while fetching image by container." });
      }
    }else if(page){
      try{
        const image = await Image.find({ page });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        res.status(200).json(image);
      }catch(error){
        console.error("Error fetching image:", error.message);
        res
          .status(500)
          .json({ error: "An error occurred while fetching image by page." });
      }
    }

  
  }catch(error){
    console.error("Error fetching image:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching image." });
  }
}

const postImage = async (req, res) => {
  // Handle the image upload logic here
  const {imageId,imageURL, altText, page, container} = req.body;
  if(!imageURL || !altText || !page){
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const newImage = new Image({ imageId,imageURL, altText, page,container });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error saving image:", error.message);
    res.status(500).json({ error: "An error occurred while saving the image." });
  }
};

const addMenuItems = async (req, res) => {
  const { restaurantId } = req.params; // Get restaurantId from the URL parameter
  const products = req.body; // Get the array of products from the request body

  // Log the received data for debugging
  console.log("Restaurant ID:", restaurantId);
  console.log("Products:", products);

  try {
    // Ensure each product has the correct restaurantId
    const validatedProducts = products.map((product) => ({
      ...product,
      restaurantId: product.restaurantId || restaurantId, // Use provided or fallback to URL parameter
    }));

    // Insert the validated products into the database
    const savedProducts = await Product.insertMany(validatedProducts);

    // Respond with the saved products
    res.status(201).json(savedProducts);
  } catch (err) {
    // Handle potential errors
    res.status(500).json({ error: err.message });
  }
};

const addRestaurant = async (req,res) => {
  const { restaurantName } = req.body;

  // Validate required fields
  if (!restaurantName) {
    return res.status(400).json({ message: "Restaurant name and banner image are required." });
  }

  try {
    // Create a new restaurant instance
    const newRestaurant = new Restaurant({
      restaurantName
    });

    // Save the restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant added successfully.",
      data: savedRestaurant,
    });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Internal server error." });
  }

}

const getMenu = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    // Step 1: Find all products for the given restaurantId
    const products = await Product.find({ restaurantId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this restaurant." });
    }

    // Step 2: Fetch the corresponding image for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const image = await Image.findOne({ imageId: product.productImageId }); // Fetch the image using productImageId
        return {
          ...product.toObject(), // Convert Mongoose document to plain object
          productImage: image ? image.imageURL : null, // Include the image URL if found
        };
      })
    );

    // Step 3: Return the products with image details
    return res.status(200).json({
      restaurantId,
      menu: productsWithImages, // Products enriched with image details
    });
  } catch (error) {
    console.error("Error fetching menu for restaurant:", error);
    return res.status(500).json({ message: "Server error." });
  }
};



module.exports = {
  getCart,
  getUser,
  getReview,
  getImage,
  postImage,
  addMenuItems,
  addRestaurant,
  getMenu
};
