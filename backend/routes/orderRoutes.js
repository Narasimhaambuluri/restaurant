const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const menu = require("../models/menu_items");
const jwt = require("jsonwebtoken");
const foodOrder = require("../models/food_orders");

router.get("/", async (req, res) => {
  const allItems = await menu.find({}, { name: 1 });
  res.status(200).json(allItems);
});

router.post("/place", async (req, res) => {
  try {
    const { token, item_name, quantity, address } = req.body;
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const item_price_query = await menu.find(
      { name: { $eq: item_name } },
      { price: 1, _id: 0 }
    );
    if (item_price_query.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const item_price = item_price_query[0].price;

    const total_price = item_price * quantity;

    const new_order = await foodOrder.create({
      email: decoded.email,
      item_name,
      quantity,
      total_price,
      address,
    });
    if (new_order) {
      res.status(200).json({ msg: "order placed successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
