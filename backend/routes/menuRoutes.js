const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  type: String,
  category: String,
});

const menu = mongoose.model("menu_items", menuSchema);

router.get("/items", async (req, res) => {
  try {
    const { categories } = req.query;
    if (!categories) {
      const allItems = await menu.find({});
      return res.status(200).json(allItems);
    }
    const items = await menu.find({ category: categories });
    if (items.length === 0) {
      return res
        .status(400)
        .json({ message: "There are no items in this category" });
    }
    return res.status(200).json(items);
  } catch (error) {
    console.log("Error fetching items", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
