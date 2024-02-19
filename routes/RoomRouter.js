const express = require("express");
const router = express.Router();
const { getRooms } = require("../controllers/RoomsController");
const {
  authMiddleware,
  permissionUser,
} = require("../middleware/UserMiddleware");

router.get("/", authMiddleware, getRooms);

module.exports = router;
