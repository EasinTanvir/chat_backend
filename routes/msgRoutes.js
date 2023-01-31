const express = require("express");
const router = express.Router();
const msgCntrl = require("../controllers/messageCntrl");
const protectRoutes = require("../helper/protectRoutes");

router.route("/create").post(protectRoutes, msgCntrl.CreateMessage);
router.route("/:id").get(protectRoutes, msgCntrl.getMessage);

module.exports = router;
