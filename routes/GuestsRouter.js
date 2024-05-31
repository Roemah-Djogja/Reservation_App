const express = require("express");
const router = express.Router();
const {
    authMiddleware,
    permissionUser,
} = require("../middleware/UserMiddleware");

const { getGuests, createGuest, getGuestById, updateGuest, deleteGuest } = require("../controllers/GuestsController")

router.get("/", authMiddleware, permissionUser("pengelola", "admin"), getGuests);
router.post("/", authMiddleware, createGuest);
router.get("/:id", authMiddleware, permissionUser("admin"), getGuestById);
router.put("/:id", authMiddleware, permissionUser("admin"), updateGuest);
router.delete("/:id", authMiddleware, permissionUser("pengelola"), deleteGuest);

module.exports = router;