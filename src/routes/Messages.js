import express from "express";
import {
  addMessage,
  getAllMessageByTicketID,
} from "../controllers/Messages.js";

const router = express.Router();

router.post("/", getAllMessageByTicketID);
router.post("/add", addMessage);

export { router as MessageRouter };
