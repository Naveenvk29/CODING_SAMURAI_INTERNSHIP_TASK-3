import express from "express";
import {
  sendmessage,
  getmessage,
  getmessageById,
} from "../Controllers/messages.controllers.js";

import authenticate from "../MiddleWares/auth.middleware.js";

const router = express.Router();

router.route("/").post(sendmessage).get(authenticate, getmessage);

router.get("/:id", authenticate, getmessageById);

export default router;
