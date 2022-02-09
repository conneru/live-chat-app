const express = require("express");
const router = express.Router();
const Chatroom = require("../models/Chatroom");
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const { name, user } = req.body;

  const room = await new Chatroom({ name: name, users: user, admin: user });
  const savedRoom = await room.save();

  res.send(savedRoom);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const room = await Chatroom.find({ users: { $in: [userId] } });

  res.send(room);
});
router.delete("/:roomId", async (req, res) => {
  const { roomId } = req.params;

  const room = await Chatroom.findByIdAndDelete(roomId);
  const messages = await Message.deleteMany({ roomId });

  res.send(JSON.stringify(roomId));
});

router.post("/all", async (req, res) => {
  const { userId } = req.body;
  const chatrooms = await Chatroom.find({ users: { $nin: [userId] } });

  res.send(chatrooms);
});

router.patch("/", async (req, res) => {
  const { chatId, user } = req.body;

  await Chatroom.updateOne({ _id: chatId }, { $push: { users: user } });

  let room = await Chatroom.findById(chatId);
  res.send(room);
});

router.patch("/update", async (req, res) => {
  const { roomId, profilePic, name, userId } = req.body;

  await Chatroom.updateOne({ _id: roomId }, { name, profilePic });
  const room = await Chatroom.findById(roomId);
  // const chatrooms = await Chatroom.find({ users: { $nin: [userId] } });
  res.send(room);
});

module.exports = router;
