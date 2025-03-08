import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createPost,
  getFeedPosts,
  deletePost,
  getPostById,
  createComment,
  likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts);
router.get("/:id", protectRoute, getPostById);
router.post("/create", protectRoute, createPost);
router.post("/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);
router.delete("/delete/:id", protectRoute, deletePost);

export default router;