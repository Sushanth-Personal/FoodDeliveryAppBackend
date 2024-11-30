const express = require("express");
const mongoose = require("mongoose");
const Image = require("../models/imageModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Restaurant = require("../models/restaurantModel");
const Product = require("../models/productModel");
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Convert userId to Mongoose ObjectId if not already
    const objectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : null;

    if (!objectId) {
      return res
        .status(400)
        .json({ message: "Invalid userId format" });
    }

    // Fetch all cart items for the given userId
    const cartItems = await Cart.find({ userId: objectId });

    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart details fetched successfully",
      cartItems,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching cart details", error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const userId = mongoose.Types.ObjectId.isValid(id)
    ? new mongoose.Types.ObjectId(id)
    : null;

  if (!userId) {
    return res.status(400).json({ message: "Invalid userId format" });
  }

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
    const user = await User.findById(userId); // Exclude 'cart' field using projection

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
    res.status(500).json({
      error: "An unexpected error occurred while fetching the user.",
    });
  }
};

const updateUser = async (req, res) => {
  const { userName, email, contact, gender, country } = req.body;
  const { id } = req.params;

  const userId = mongoose.Types.ObjectId.isValid(id)
    ? new mongoose.Types.ObjectId(id)
    : null;

  if (!userId) {
    return res.status(400).json({ message: "Invalid userId format" });
  }
  try {
    // Check if the userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (gender) user.gender = gender;
    if (country) user.country = country;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the user",
        error,
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
    const { imageId, page, container, altText, productIdArray } =
      req.query;
    let productIds = [];

    // If productIdArray is passed as a comma-separated string in the query
    if (productIdArray) {
      productIds = productIdArray
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id));
    }

    // Fetch images for the given productIds
    if (productIds.length > 0) {
      try {
        // Fetch productImageId(s) from the Product model based on productIds
        const products = await Product.find({
          _id: { $in: productIds },
        });

        // Check if we got the products, if not return an error
        if (products.length === 0) {
          return res
            .status(404)
            .json({
              error: "No products found for the given product IDs.",
            });
        }

        // Extract productImageIds from the products
        const productImageIds = products.map(
          (product) => product.productImageId
        );
        console.log(productImageIds);
        // Now, query the Image model to find the images using productImageIds
        const images = await Image.find({
          imageId: { $in: productImageIds },
        });
        console.log(images);
        // If no images are found, return a 404 error
        if (images.length === 0) {
          return res
            .status(404)
            .json({
              error:
                "No images found for the given product image IDs.",
            });
        }

        return res
          .status(200)
          .json(images.map((image) => image.imageURL));
      } catch (error) {
        console.error(
          "Error fetching images by product IDs:",
          error.message
        );
        return res
          .status(500)
          .json({
            error: "An error occurred while fetching images.",
          });
      }
    }

    // Handle other cases (e.g., imageId, altText, container, page) if no productIdArray
    if (imageId) {
      try {
        const image = await Image.findOne({ imageId });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        return res.status(200).json(image);
      } catch (error) {
        console.error(
          "Error fetching image by imageId:",
          error.message
        );
        return res
          .status(500)
          .json({
            error:
              "An error occurred while fetching image by imageId.",
          });
      }
    } else if (altText) {
      try {
        const image = await Image.findOne({ altText });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        return res.status(200).json(image);
      } catch (error) {
        console.error(
          "Error fetching image by altText:",
          error.message
        );
        return res
          .status(500)
          .json({
            error:
              "An error occurred while fetching image by altText.",
          });
      }
    } else if (container) {
      try {
        const image = await Image.find({ container });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        return res.status(200).json(image);
      } catch (error) {
        console.error(
          "Error fetching image by container:",
          error.message
        );
        return res
          .status(500)
          .json({
            error:
              "An error occurred while fetching image by container.",
          });
      }
    } else if (page) {
      try {
        const image = await Image.find({ page });
        if (!image) {
          return res.status(404).json({ error: "Image not found." });
        }
        return res.status(200).json(image);
      } catch (error) {
        console.error("Error fetching image by page:", error.message);
        return res
          .status(500)
          .json({
            error: "An error occurred while fetching image by page.",
          });
      }
    } else {
      return res
        .status(400)
        .json({
          error: "Invalid request. No valid parameters provided.",
        });
    }
  } catch (error) {
    console.error("Error processing image request:", error.message);
    return res
      .status(500)
      .json({
        error:
          "An error occurred while processing the image request.",
      });
  }
};

const postImage = async (req, res) => {
  const images = req.body;

  if (!Array.isArray(images)) {
    return res
      .status(400)
      .json({ error: "Request body must be an array of images." });
  }

  try {
    const savedImages = [];

    for (const image of images) {
      const { imageId, imageURL, altText, page, container } = image;
      if (!imageURL || !altText || !page) {
        return res
          .status(400)
          .json({
            error: "Missing required fields in one or more images.",
          });
      }

      const newImage = new Image({
        imageId,
        imageURL,
        altText,
        page,
        container,
      });
      await newImage.save();
      savedImages.push(newImage);
    }

    res.status(201).json(savedImages);
  } catch (error) {
    console.error("Error saving images:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while saving the images." });
  }
};

const addMenuItems = async (req, res) => {
  const { restaurantId } = req.params; // Get restaurantId from the URL parameter
  const products = req.body; // Get the array of products from the request body

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

const addRestaurant = async (req, res) => {
  const { restaurantName } = req.body;

  // Validate required fields
  if (!restaurantName) {
    return res
      .status(400)
      .json({
        message: "Restaurant name and banner image are required.",
      });
  }

  try {
    // Create a new restaurant instance
    const newRestaurant = new Restaurant({
      restaurantName,
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
};

const getMenu = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    // Step 1: Find all products for the given restaurantId
    const products = await Product.find({ restaurantId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this restaurant." });
    }

    // Step 2: Fetch the corresponding image for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const image = await Image.findOne({
          imageId: product.productImageId,
        }); // Fetch the image using productImageId
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

const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.query;

  const userIdObject = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : null;

  const productIdObject = mongoose.Types.ObjectId.isValid(productId)
    ? new mongoose.Types.ObjectId(productId)
    : null;

  if (!userIdObject || !productIdObject) {
    return res
      .status(400)
      .json({ message: "Invalid userId or productId format" });
  }

  try {
    const product = await Product.findOne({ _id: productIdObject });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await Cart.findOne({
      userId: userIdObject,
      productId: productIdObject,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId: userIdObject,
        restaurantId: product.restaurantId,
        productId: productIdObject,
        productName: product.productName,
        price: product.productPrice,
        quantity: 1,
      });

      await cartItem.save();
    }

    // Fetch the updated cart for the user
    const updatedCart = await Cart.find({ userId: userIdObject });

    return res.status(200).json({
      message: cartItem
        ? "Product quantity updated"
        : "Product added to cart",
      cartItems: updatedCart, // Send the entire updated cart
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding product to cart", error });
  }
};

const deleteFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.query;

  const userIdObject = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : null;

  const productIdObject = mongoose.Types.ObjectId.isValid(productId)
    ? new mongoose.Types.ObjectId(productId)
    : null;

  if (!userIdObject || !productIdObject) {
    return res
      .status(400)
      .json({ message: "Invalid userId or productId format" });
  }

  try {
    // Find the cart item to delete
    const cartItem = await Cart.findOneAndUpdate(
      {
        userId: userIdObject,
        productId: productIdObject,
        quantity: { $gt: 0 },
      },
      { $inc: { quantity: -1 } },
      { new: true }
    );

    if (cartItem.quantity === 0) {
      await Cart.deleteOne({ _id: cartItem._id });
    }

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Fetch the updated cart for the user
    const updatedCart = await Cart.find({ userId: userIdObject });

    return res.status(200).json({
      message: "Product removed from cart",
      cartItems: updatedCart, // Send the entire updated cart
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error removing product from cart", error });
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
  getMenu,
  addToCart,
  deleteFromCart,
  updateUser,
};
