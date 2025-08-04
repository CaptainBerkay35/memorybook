import express from "express";

import {
  getPosts,
  getRecentPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsByUser,
  getLikedPosts,
  getPostsByTag,
  getPostsByUserInterests,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/recent", getRecentPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.get("/user/:id", getPostsByUser);
router.get("/liked/:userId", getLikedPosts);

router.get("/tag/:tag", getPostsByTag);
router.get("/interests/:userId", auth, getPostsByUserInterests);



export default router;
