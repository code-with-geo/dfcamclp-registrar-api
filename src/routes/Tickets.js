import express from "express";
import {
  addTicket,
  getAllTickets,
  getAllTicketsByDepartment,
  getTicketsByID,
  getTicketsByTicketID,
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
router.post("/get-by-ticketid", getTicketsByTicketID);

export { router as TicketRouter };
