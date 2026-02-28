import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { viewResume, downloadResume } from "../controllers/resume.controllers.js";

const router = express.Router();

router.get("/view/:id", isAuthenticated, viewResume);
router.get("/download/:id", isAuthenticated, downloadResume);

export default router;
