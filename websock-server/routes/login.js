const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",

    failureFlash: true,
  }),
  (req, res) => {
    res.send(req.session.passport.user);
  }
);

module.exports = router;
