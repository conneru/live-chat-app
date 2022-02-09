const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  let { username, email, hashedPassword } = req.body;
  hashedPassword = await bcrypt.hash(hashedPassword, 10);
  //   console.log(hashedPassword);
  const user = await new User({
    username,
    email,
    hashedPassword,
  });
  const savedUser = await user.save();
  res.send(savedUser);
});

module.exports = router;
