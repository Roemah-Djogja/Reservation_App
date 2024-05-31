const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  permissionUser,
} = require("../middleware/UserMiddleware");
const {
  getRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/RoomsController");

router.get("/", authMiddleware, getRooms);
router.post("/", authMiddleware, permissionUser("admin"), createRoom);
router.put("/:id", authMiddleware, permissionUser("admin"), updateRoom);
router.get("/:id", authMiddleware, getRoomById);
router.delete("/:id", authMiddleware, permissionUser("admin"), deleteRoom);

module.exports = router;
