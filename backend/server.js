const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const locationRouter = require("./routes/locationRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error in connecting to database", err);
  });

app.use("/location", locationRouter);

app.listen(process.env.PORT, () => {
  console.log("Running successfully");
});
