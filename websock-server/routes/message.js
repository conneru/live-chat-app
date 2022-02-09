const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { userId, roomId, content, username } = req.body;

  const message = await new Message({
    userId,
    roomId,
    content,
    username,
  });

  const savedMsg = await message.save();

  res.send(savedMsg);
});

router.delete("/:msgId", async (req, res) => {
  const { msgId } = req.params;
  const message = await Message.deleteOne({ _id: msgId });

  res.send(JSON.stringify(msgId));
});

router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const messages = await Message.find({ roomId }).sort({ created_at: -1 });
  let users = {};
  for (let msg of messages) {
    let msgUser;
    if (users[msg.userId]) {
      msgUser = users[msg.userId];
    } else {
      msgUser = await User.findById(msg.userId);
      users[msg.userId] = msgUser;
    }

    msg.username = msgUser.username;
    msg.profilePic = msgUser.profilePic;
  }
  res.send(messages);
});

module.exports = router;
