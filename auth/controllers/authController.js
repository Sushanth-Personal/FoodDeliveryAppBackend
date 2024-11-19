const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const jwtExpiresIn = "15m";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: jwtExpiresIn,
  });
};


const registerUser = async (req, res) => {

  const { userName, password, email, gender, country} = req.body;

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
    const user = new User({ userName, password, email, gender, country });

    // Save the user to the database
    await user.save();

    // Generate JWT (you would need a function to do this)
    const accessToken = generateAccessToken(user); // This should be a function to generate the token

    // Send response with tokens
    res
      .status(200)
      .json({ message: "Success", user, accessToken });
  } catch (error) {
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

    // Fetch the complete user data along with the cart
    // Use populate to retrieve the cart data if it's a reference to the Cart model
    const fullUser = await User.findById(user._id)
      .populate('cart')  // Populating cart data if it's a reference
      .exec();

    // Make sure to remove sensitive fields like password and __v before sending the response
    const userData = fullUser.toObject(); // Convert Mongoose document to plain object
    delete userData.password; // Remove password field
    delete userData.__v; // Optionally remove Mongoose version key

    // Send the response with the complete user data, including cart data, and access token
    res.status(200).json({
      message: "Login successful",
      user: userData,  // Send complete user data along with cart
      accessToken,     // Send access token
    });
  } catch (error) {
    console.error("Login error:", error.message); // Log the error
    res.status(500).json({ error: "Server error during login" }); // Handle server error
  }
};



const checkAccessToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Authorization: Bearer <token>'

  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    // Verify access token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Check if the token has expired
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < now) {
      return res.sendStatus(403); // Forbidden, token expired
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.sendStatus(403); // Forbidden if the user is not found
    }

    // Generate a new access token if needed
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    return res.sendStatus(403); // Forbidden on any verification error
  }
};


module.exports = {
  registerUser,
  loginUser,
  checkRefreshToken,
  checkAccessToken,
};
