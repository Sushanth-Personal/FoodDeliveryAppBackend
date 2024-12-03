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
  deleteFromCart,
  updateUser,
  getCards,
  addCards,
  deleteCard
} = require("../controllers/mainController.js");

router.delete("/cards/:id/:cardId", deleteCard);
router.post("/cards/:id", addCards);
router.get("/cards/:id", getCards);
router.get("/cart/:userId", getCart);
router.get("/review/restaurantId", getReview);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.post("/image", postImage);
router.get("/image", getImage);
router.post("/menu/:restaurantId", addMenuItems);
router.post("/restaurant", addRestaurant);
router.get("/menu/:restaurantId",getMenu);
router.post("/cart/:userId", addToCart);
router.delete("/cart/:userId", deleteFromCart);
router.get("/",(req, res) => res.send("Authenticated"));

module.exports = router;
