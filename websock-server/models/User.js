const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  profilePic: { type: String, default: null },
});

module.exports = mongoose.model("Users", UserSchema);
