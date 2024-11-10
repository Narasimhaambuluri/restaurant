const mongoose = require("mongoose");
const express = require("express");
const user = require("../models/userModel");
const tableOrders = require("../models/tableOrderModel");
const foodOrders = require("../models/food_orders");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  res.status(200).json({ email: decoded.email });
});

router.post("/mybookings", async (req, res) => {
  const { token } = req.body;
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const all_bookings = await tableOrders.find({ email: decoded.email });
  res.status(200).json(all_bookings);
});

router.post("/myorders", async (req, res) => {
  const { token } = req.body;
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const all_orders = await foodOrders.find({ email: decoded.email });
  res.status(200).json(all_orders);
});

module.exports = router;
