const express = require("express");
const router = express.Router();
const {
    authMiddleware,
    permissionUser,
} = require("../middleware/UserMiddleware");

const { getTypes, createType, updateType, getTypeById, deleteType } = require("../controllers/TypesController")

router.get("/", authMiddleware, getTypes);
router.post("/", authMiddleware, permissionUser("admin"), createType);
router.get("/:id", authMiddleware, getTypeById);
router.put("/:id", authMiddleware, permissionUser("admin"), updateType);
router.delete("/:id", authMiddleware, permissionUser("admin"), deleteType);

module.exports = router;