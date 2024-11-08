const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  id: Number,
  location_name: String,
  address: String,
  landmark: String,
  description: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});

const Locations = mongoose.model("locations", LocationSchema);

router.get("/", async (req, res) => {
  try {
    const locations = await Locations.find({}, "-coordinates");
    res.status(200).json(locations);
  } catch (error) {
    console.log("Error fecthing locations", error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const locations = await Locations.find({}, { location_name: 1, _id: 0 });
    res.status(200).json(locations);
  } catch (error) {
    console.log("error fetching all locations");
  }
});

module.exports = router;
