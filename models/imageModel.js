const express = require("express");
const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    imageId: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    page: { type: String, required: true },
    container: { type: String, required: true },
    altText: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;