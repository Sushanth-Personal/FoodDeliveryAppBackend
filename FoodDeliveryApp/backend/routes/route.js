const express = require("express");
const router = express.Router();
const {
  getCart,
  getUser,
  getReview,
  getImage,
  postImage,
  addMenuItems,
  addRestaurant,
  getMenu,
  addToCart,
  deleteFromCart
} = require("../controllers/mainController.js");

router.get("/cart/:userId", getCart);
router.get("/review/restaurantId", getReview);
router.get("/user/:userId", getUser);
router.post("/image", postImage);
router.get("/image", getImage);
router.post("/menu/:restaurantId", addMenuItems);
router.post("/restaurant", addRestaurant);
router.get("/menu/:restaurantId",getMenu);
router.post("/cart/:userId", addToCart);
router.delete("/cart/:userId", deleteFromCart);
router.get("/",(req, res) => res.send("Authenticated"));

module.exports = router;
