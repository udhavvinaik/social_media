import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import {addComment } from "../controllers/posts.js";
import { deletePost } from "../controllers/posts.js";
import { deleteComment } from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* ADD COMMENT */
router.post("/:id/comment", verifyToken, addComment);

router.delete("/:id", verifyToken, deletePost);

router.delete("/:postId/comment/:commentId", verifyToken, deleteComment);



export default router;
