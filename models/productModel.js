const mongoose = require("mongoose");
const Restaurant = require("./restaurantModel");  // Capitalized "Restaurant" to match the model name

const productSchema = mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",  // Use the capitalized model name here
    },
    productName: { type: String, default: "" },
    productImageLarge: { type: String, default: "" },
    productImageSmall: { type: String, default: "" },
    productDescription: { type: String, default: "" },
    productPrice: { type: Number, default: 0 },
    productCategory: { type: String, default: "" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
