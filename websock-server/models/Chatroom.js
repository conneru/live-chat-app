const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [],
  admin: String,
  profilePic: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chatrooms", ChatroomSchema);
