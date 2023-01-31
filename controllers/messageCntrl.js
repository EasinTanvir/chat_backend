const messageSchema = require("../models/messageSchema");
const converSchema = require("../models/conversationSchema");
const HttpError = require("../helper/HttpError");
const userSchema = require("../models/userSchema");

const CreateMessage = async (req, res, next) => {
  const { id, userName, email, text, conId } = req.body;

  let recUser;

  try {
    recUser = await userSchema.findById(id);
  } catch (err) {
    const errors = new HttpError("find rec user failed", 500);
    return next(errors);
  }

  const myMessage = {
    sender: {
      id: req.userData.id,
      userName: req.userData.userName,
      email: req.userData.email,
      image: req.userData.image,
    },

    receiver: {
      id: id,
      userName: userName,
      email: email,
      text: text,
      image: recUser.image,
    },

    text: text,
    converid: conId.toString(),
  };

  const io = req.app.get("name");
  io.emit("message", { action: "create", message: myMessage });

  const newMessage = new messageSchema({
    sender: {
      id: req.userData.id,
      userName: req.userData.userName,
      email: req.userData.email,
      image: req.userData.image,
    },

    receiver: {
      id: id,
      userName: userName,
      email: email,
      text: text,
      image: recUser.image,
    },

    text: text,
    converid: conId,
  });
  let result;

  try {
    result = await newMessage.save();
  } catch (err) {
    const errors = new HttpError("find existing user failed", 500);
    return next(errors);
  }

  res.status(200).json(result);
};

const getMessage = async (req, res, next) => {
  let message;

  try {
    message = await messageSchema.find({ converid: req.params.id });
  } catch (err) {
    const errors = new HttpError("find message failed", 500);
    return next(errors);
  }

  try {
    const { creator, participant } = await converSchema.findById(req.params.id);
    res.status(200).json({ message, creator, participant });
  } catch (err) {
    const errors = new HttpError("find message failed", 500);
    return next(errors);
  }
};

module.exports = {
  CreateMessage,
  getMessage,
};
