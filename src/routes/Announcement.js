import express from "express";
import {
  addAnnouncement,
  getAllAnnouncement,
  getAnnouncementByID,
  removeAnnouncement,
  updateAnnouncement,
} from "../controllers/Announcement.js";

const router = express.Router();

router.post("/add", addAnnouncement);
router.post("/update", updateAnnouncement);
router.post("/remove", removeAnnouncement);
router.get("/", getAllAnnouncement);
router.post("/get-by-id", getAnnouncementByID);

export { router as AnnouncementRouter };
