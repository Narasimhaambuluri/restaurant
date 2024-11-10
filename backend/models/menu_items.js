const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  type: String,
  category: String,
});

const menu = mongoose.model("menu_items", menuSchema);

module.exports = menu;
