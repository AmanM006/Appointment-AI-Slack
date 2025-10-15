const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get all messages
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { uid, content, threadId, parentId } = req.body;

    // 1. Find the MongoDB user using Firebase UID
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Create a new message
    const message = new Message({
      content,
      author: user._id, // MongoDB _id
      timestamp: new Date(),
      threadId,
      parentId
    });

    await message.save();

    // 3. Populate and return
    const populatedMessage = await message.populate("author", "name");
    res.json(populatedMessage);

  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
});

module.exports = router;