const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = await user.find({ email: email });
    if (existedUser.length == 1) {
      return res.send("existed");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create([
      { name: name, email: email, password: hashedPassword },
    ]);
    if (newUser) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      return res.status(200).json({ msg: "User created successfully", token });
    }
  } catch (error) {
    return res.send("Register Problem");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await user.find({ email });
    if (!checkUser) {
      return res.send("No user");
    }
    const regUserPassword = await user.find({ email: email }, { password: 1 });

    const comparePassword = await bcrypt.compare(
      password,
      regUserPassword[0].password
    );
    if (comparePassword) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      return res.status(200).json({ msg: "Login Success", token });
    } else {
      return res.send("wrong password");
    }
  } catch (error) {
    res.send("Login error");
  }
});

module.exports = router;
