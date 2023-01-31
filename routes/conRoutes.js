const express = require("express");
const router = express.Router();
const conCntrl = require("../controllers/converContrl");
const protectRoutes = require("../helper/protectRoutes");

router.route("/create").post(protectRoutes, conCntrl.CreateConversation);
router.route("/").get(protectRoutes, conCntrl.getConversation);

module.exports = router;
