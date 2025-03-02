import express from "express";
import {
  getPublicProfile,
  getSuggestedConnections,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.patch("/:username", protectRoute, updateProfile);
export default router;
