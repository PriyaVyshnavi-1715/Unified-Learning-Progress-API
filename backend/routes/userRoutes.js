const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getDashboard,
    updateLearningProgress,
    getRecommendations
} = require("../controllers/userController");

router.get("/", protect, getUsers);

router.post("/", createUser);

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

router.get("/dashboard/:id", protect, getDashboard);

router.put("/progress/:id", protect, updateLearningProgress);

router.get("/recommendations/:id", protect, getRecommendations);

module.exports = router;