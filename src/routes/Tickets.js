import express from "express";
import {
  addTicket,
  getAllTickets,
  getTicketsByID,
  removeTicket,
  updateTicketStatus,
} from "../controllers/Tickets.js";

const router = express.Router();

router.post("/add", addTicket);
router.post("/remove", removeTicket);
router.post("/update-status", updateTicketStatus);
router.get("/", getAllTickets);
router.post("/get-by-id", getTicketsByID);

export { router as TicketRouter };
