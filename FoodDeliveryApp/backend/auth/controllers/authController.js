const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtExpiresIn = "150m";

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

    // Fetch the entire user data
    const fullUser = await User.findById(user._id);

    if (!fullUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert the Mongoose document to a plain object
    const userData = fullUser.toObject();

    // Remove the password field from the user data
    delete userData.password;

    // Send the response with user data and access token
    res.status(200).json({
      message: "Login successful",
      user: userData,  // Send all user details excluding the password
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
