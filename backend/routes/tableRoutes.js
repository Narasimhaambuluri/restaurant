const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const tableOrders = require("../models/tableOrderModel");
const router = express.Router();

const tableSchema = new mongoose.Schema({
  locationName: String,
  totalTables: Number,
  premiumTables: Number,
  vipTables: Number,
});

const tables = mongoose.model("tables", tableSchema);

router.post("/", async (req, res) => {
  try {
    const { location, date } = req.body;
    const total_order_history = await tableOrders.find({
      booked_date: { $eq: date },
      location_name: { $eq: location },
    });
    const vip_order_history = await tableOrders.find({
      booked_date: { $eq: date },
      table_type: { $eq: "VIP" },
      location_name: { $eq: location },
    });
    const vip_slots = await tableOrders.find(
      {
        booked_date: { $eq: date },
        table_type: { $eq: "VIP" },
        location_name: { $eq: location },
      },
      { slot_booked: 1, _id: 0 }
    );
    const vip_booked = vip_slots.map((slot) => {
      return slot.slot_booked;
    });
    const premium_order_history = await tableOrders.find({
      booked_date: { $eq: date },
      table_type: { $eq: "Premium" },
      location_name: { $eq: location },
    });

    const premium_slots = await tableOrders.find(
      {
        booked_date: { $eq: date },
        table_type: { $eq: "Premium" },
        location_name: { $eq: location },
      },
      { slot_booked: 1, _id: 0 }
    );
    const premium_booked = premium_slots.map((slot) => {
      return slot.slot_booked;
    });
    const table_info = await tables.find({ locationName: location });
    return res.status(200).json({
      total_tables: table_info[0].totalTables - total_order_history.length,
      vipTables: table_info[0].vipTables - vip_order_history.length,
      premiumTables: table_info[0].premiumTables - premium_order_history.length,
      premium_booked,
      vip_booked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "There is an error fetching tables info",
      error: error,
    });
  }
});

router.post("/book", async (req, res) => {
  const {
    token,
    booked_date,
    location_name,
    slot_booked,
    members,
    table_type,
  } = req.body;
  const decoded_token = jwt.verify(token, process.env.SECRET_KEY);
  const newTableOrder = await tableOrders.create({
    email: decoded_token.email,
    booked_date,
    slot_booked,
    location_name,
    table_type,
    members,
  });
  if (newTableOrder) {
    res.status(200).json({ msg: "Table Booked Successfully" });
  } else {
    console.log("Error booking table");
  }
});

module.exports = router;
