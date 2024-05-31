const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  permissionUser,
} = require("../middleware/UserMiddleware");
const { getUsers, createUser, updateUser, deleteUser, getUserById } = require("../controllers/UsersController");

router.get("/", authMiddleware, permissionUser("admin"), getUsers);
router.post("/", authMiddleware, permissionUser("admin"), createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, permissionUser("admin"), deleteUser);
router.get("/:id", authMiddleware, permissionUser("admin"), getUserById);

module.exports = router;
