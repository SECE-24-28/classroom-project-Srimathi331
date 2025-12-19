const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Multer setup for avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ------------------- Routes -------------------

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin-only route
router.get("/", verifyToken, isAdmin, getUsers);

// Protected user routes
router.get("/me", verifyToken, getCurrentUser);
router.put("/me", verifyToken, upload.single("avatar"), updateProfile);
router.put("/me/password", verifyToken, changePassword);

module.exports = router;
