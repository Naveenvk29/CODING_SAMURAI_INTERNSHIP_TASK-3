import express from "express";
import {
  createPost,
  getAllPost,
  getPostById,
  uploadPost,
  deletePost,
} from "../Controllers/blog.controllers.js";
import authenticate from "../MiddleWares/auth.middleware.js";
import { upload } from "../MiddleWares/multer.middleware.js";

const router = express.Router();

// Route to handle blog post creation with image upload
router
  .route("/")
  .post(authenticate, upload.single("image"), createPost)
  .get(getAllPost);

router
  .route("/blog/:id")
  .get(getPostById)
  .patch(authenticate, upload.single("image"), uploadPost)
  .delete(authenticate, deletePost);
export default router;
