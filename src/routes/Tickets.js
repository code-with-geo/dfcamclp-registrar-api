import express from "express";
import {
  addTicket,
  getAllTickets,
  getAllTicketsByDepartment,
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
router.post("/department", getAllTicketsByDepartment);

export { router as TicketRouter };
