const express = require("express");
const router = express.Router();
const userCntrl = require("../controllers/userCntrl");
const protectRoutes = require("../helper/protectRoutes");

router.route("/signup").post(userCntrl.createUser);
router.route("/signin").post(userCntrl.signIn);
router.route("/").get(protectRoutes, userCntrl.fetchUser);
router.route("/update").patch(protectRoutes, userCntrl.updateUser);

module.exports = router;
