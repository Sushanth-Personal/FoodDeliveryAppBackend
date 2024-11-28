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
  getMenu
} = require("../controllers/mainController.js");

router.get("/cart/:userId/:restaurantId", getCart);
router.get("/review/restaurantId", getReview);
router.get("/user/:userId", getUser);
router.post("/image", postImage);
router.get("/image", getImage);
router.post("/menu/:restaurantId", addMenuItems);
router.post("/restaurant", addRestaurant);
router.get("/menu/:restaurantId",getMenu);


module.exports = router;
