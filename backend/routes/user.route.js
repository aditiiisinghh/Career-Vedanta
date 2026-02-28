import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getProfile,
  toggleSaveJob
} from "../controllers/user.controller.js";
//import { updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register
router.post("/register", singleUpload, register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Get Profile
router.get("/profile", isAuthenticated, getProfile);

// Update Profile
router.post(
  "/profile/update",
  isAuthenticated,
  singleUpload,      // 🔥 THIS WAS MISSING
  updateProfile
);


// Save Job
router.post("/save-job/:jobId", isAuthenticated, toggleSaveJob);

export default router;
