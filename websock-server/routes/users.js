const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { username, email, hashedPassword } = req.body;
  const user = await new User({
    username,
    email,
    hashedPassword,
  });
  const savedUser = await user.save();
  res.json(savedUser);
});

router.get("/:userId", async (req, res) => {
  let { userId } = req.params;
  let user = await User.findById(userId);

  res.send(user);
});

router.get("/", async (req, res) => {
  // console.log(req.user, "data");
  if (req.session.passport) {
    // console.log("in here");
    let user = await User.findById(req.session.passport.user);
    res.send(user);
  } else {
    res.send(JSON.stringify(null));
  }
});

router.patch("/", async (req, res) => {
  const { userId, profilePic, username } = req.body;

  await User.updateOne({ _id: userId }, { username, profilePic });

  let user = await User.findById(userId);
  res.send(user);
});

module.exports = router;
