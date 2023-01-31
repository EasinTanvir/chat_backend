const mongoose = require("mongoose");

const createMessage = new mongoose.Schema(
  {
    sender: {
      id: String,
      userName: String,
      email: String,
      image: String,
    },
    receiver: {
      id: String,
      userName: String,
      email: String,
      image: String,
    },
    converid: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
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

module.exports = mongoose.model("message", createMessage);
