const converSchema = require("../models/conversationSchema");
const userSchema = require("../models/userSchema");
const HttpError = require("../helper/HttpError");

const CreateConversation = async (req, res, next) => {
  const { id, userName, email } = req.body;

  let user;
  try {
    user = await userSchema.findById(req.userData.id);
  } catch (err) {
    const errors = new HttpError("find existing user failed", 500);
    return next(errors);
  }

  let secUser;
  try {
    secUser = await userSchema.findById(id);
  } catch (err) {
    const errors = new HttpError("find existing user failed", 500);
    return next(errors);
  }

  if (user.participant.includes(id)) {
    const errors = new HttpError("Sorry conversation already created", 500);
    return next(errors);
  }

  user.participant.push(id);
  secUser.participant.push(req.userData.id);

  try {
    await secUser.save();
  } catch (err) {
    const errors = new HttpError("friend user update failed", 500);
    return next(errors);
  }

  try {
    await user.save();
  } catch (err) {
    const errors = new HttpError("update user failed", 500);
    return next(errors);
  }

  const newConver = new converSchema({
    creator: {
      id: req.userData.id,
      userName: req.userData.userName,
      email: req.userData.email,
      image: req.userData.image,
    },
    participant: {
      id: id,
      userName: userName,
      email: email,
      image: secUser.image,
    },
  });
  let result;
  try {
    result = await newConver.save();
  } catch (err) {
    const errors = new HttpError("create conversation failed", 500);
    return next(errors);
  }

  res.status(200).json(result);
};

const getConversation = async (req, res, next) => {
  let conver;

  try {
    conver = await converSchema.find({
      $or: [
        { "creator.id": req.userData.id },
        { "participant.id": req.userData.id },
      ],
    });
  } catch (err) {
    const errors = new HttpError("find conversation failed", 500);
    return next(errors);
  }
  if (!conver) {
    const errors = new HttpError("Sorry no conversation found", 500);
    return next(errors);
  }

  res.status(200).json(conver);
};
module.exports = {
  CreateConversation,
  getConversation,
};
