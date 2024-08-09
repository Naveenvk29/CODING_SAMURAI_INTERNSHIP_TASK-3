import express from "express";
import {
  writeComment,
  getCommentById,
  getComments,
  deleteComment,
} from "../Controllers/comment.controller.js";
import authenticated from "../MiddleWares/auth.middleware.js";
const router = express.Router();

router.route("/").post(authenticated, writeComment).get(getComments);

router.get("/:id", authenticated, getCommentById);

router.delete("/:id", authenticated, deleteComment);

export default router;
