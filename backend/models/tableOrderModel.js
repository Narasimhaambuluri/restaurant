const mongoose = require("mongoose");

const tableOrderSchema = new mongoose.Schema({
  email: String,
  booked_date: String,
  slot_booked: String,
  location_name: String,
  table_type: String,
  members: Number,
});

const tableOrders = mongoose.model("table_orders", tableOrderSchema);

module.exports = tableOrders;
