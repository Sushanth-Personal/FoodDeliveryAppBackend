const express = require('express');
const router = express.Router();
const {getCart, getUser, getReview} = require('../controllers/mainController.js');

router.get('/cart/:userId/:restaurantId', getCart);
router.get('/review/restaurantId', getReview);
router.get('/user/:userId', getUser);


module.exports = router;