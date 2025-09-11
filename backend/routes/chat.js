import express from "express";
import { createMessage, getMessages } from "../controllers/chatController.js";
import { auth } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createMessage);   // create/get chat
router.get("/:chatId/messages", auth, getMessages); // get messages

export default router;
