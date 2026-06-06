const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const SECRET = "urbanharvestsecret";

// REGISTER
router.post("/register", async (req, res) => {

  const hashedPassword =
    await bcrypt.hash(
      req.body.password,
      10
    );

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  await user.save();

  res.json({
    message: "User registered"
  });

});

// LOGIN
router.post("/login", async (req, res) => {

  const user =
    await User.findOne({
      email: req.body.email
    });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  const valid =
    await bcrypt.compare(
      req.body.password,
      user.password
    );

  if (!valid) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }

  const token =
    jwt.sign(
      { id: user._id },
      SECRET
    );

  res.json({ token });

});

module.exports = router;