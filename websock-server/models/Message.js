const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  roomId: String,
  userId: String,
  username: String,
  profilePic: { type: String, default: null },
  content: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Messages", MessageSchema);
