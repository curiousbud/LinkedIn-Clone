import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptConnectionRequest,
  getConnectionRequests,
  getConnectionStatus,
  getUserConnections,
  rejectConnectionRequest,
  removeConnection,
  sendConnectionRequest,
} from "../controllers/connection.controller.js";

const router = express.Router();

// Send a connection request to a user
router.post("/request/:userId", protectRoute, sendConnectionRequest);

// Accept  connection request
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);

// Reject a connection request
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);

// Get all connection requests for the current user
router.get("/requests", protectRoute, getConnectionRequests);

// Get all connections for a user
router.get("/", protectRoute, getUserConnections);

// Get connection status
router.get("/status/:userId", protectRoute, getConnectionStatus);

// Remove a connection
router.delete("/:userId", protectRoute, removeConnection);

export default router;
