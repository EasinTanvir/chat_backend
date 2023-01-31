const mongoose = require("mongoose");

const createConversation = new mongoose.Schema(
  {
    creator: {
      id: String,
      userName: String,
      email: String,
      image: String,
    },
    participant: {
      id: String,
      userName: String,
      email: String,
      image: String,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("conversation", createConversation);
