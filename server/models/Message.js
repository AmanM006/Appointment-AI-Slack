const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  reactions: [{
    emoji: String,
    count: Number,
    users: [String]
  }],
  threadId: String,
  parentId: String
});

module.exports = mongoose.model('Message', messageSchema);