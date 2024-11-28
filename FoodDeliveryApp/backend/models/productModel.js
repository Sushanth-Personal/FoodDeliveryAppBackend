const mongoose = require("mongoose");
const Restaurant = require("./restaurantModel");  // Capitalized "Restaurant" to match the model name
const Image = require("./imageModel");
const productSchema = mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant", // Use the capitalized model name here
    },
    productName: { type: String, default: "" },
    productDescription: { type: String, default: "" },
    productPrice: { type: Number, default: 0 },
    productCategory: { type: String, default: "" },
    productImageId: { type: String, default: "" ,unique:true},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
