const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtExpiresIn = "15m";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: jwtExpiresIn,
  });
};


const registerUser = async (req, res) => {

  const { userName, contact, email, password} = req.body;

  try {
    // Check if username already exists
    const existingUserName = await User.exists({ userName });

    if (existingUserName) {
      return res
        .status(400)
        .json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.exists({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists" });
    }
  
    // Create new user if no existing user or email found
    const user = new User({  userName, contact, email, password });

    // Save the user to the database
    await user.save();

    // Send response with tokens
    res
      .status(200)
      .json({ message: "Success" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ message: "Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Attempt to login and retrieve the user
    const user = await User.login(email, password);

    // Check if user is found and login is successful
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate the access token
    const accessToken = generateAccessToken(user._id);

    // Fetch the user data, including the cart and restaurantId (no need for full cart details)
    const fullUser = await User.findById(user._id)
      .populate({
        path: 'cart',  // Populate the cart data
        select: 'restaurantId items',  // Only fetch restaurantId and items from the cart
        populate: {
          path: 'items.productId',  // Populate productId for each cart item
          select: 'productName price productImageSmall',  // Only fetch necessary fields for product
        },
      })
      .exec();

    // Make sure to remove sensitive fields like password and __v before sending the response
    const userData = fullUser.toObject();  // Convert Mongoose document to plain object
    delete userData.password;  // Remove password field
    delete userData.__v;  // Optionally remove Mongoose version key

    // Send the response with the complete user data, including cart data, and access token
    res.status(200).json({
      message: "Login successful",
      user: userData,  // Send complete user data along with cart
      accessToken,     // Send access token
    });
  } catch (error) {
    console.error("Login error:", error.message);  // Log the error
    res.status(500).json({ error: "Server error during login" });  // Handle server error
  }
};




module.exports = {
  registerUser,
  loginUser,
};
