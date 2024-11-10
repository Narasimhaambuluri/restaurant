const mongoose = require("mongoose");

const foodOrderSchema = new mongoose.Schema({
  email: String,
  item_name: String,
  quantity: Number,
  total_price: Number,
  address: String,
  order_date: {
    type: Date,
    default: Date.now,
  },
});

const foodOrder = new mongoose.model("food_orders", foodOrderSchema);

module.exports = foodOrder;
