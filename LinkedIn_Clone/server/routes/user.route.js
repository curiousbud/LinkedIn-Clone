import express from "express";
import { get } from "mongoose";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);

export default router;
