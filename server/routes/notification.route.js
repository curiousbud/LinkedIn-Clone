// The notification.route.js file is the route file for the notification-related operations.
// It defines the routes for getting notifications, creating notifications, and marking notifications as read.
// The routes are protected by the protectRoute middleware, which ensures that only authenticated users can access these routes.

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUserNotifications,
  markNotificationsAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications);
router.put("/:id/read", protectRoute, markNotificationsAsRead);
router.delete("/:id", protectRoute, deleteNotification);

export default router;
