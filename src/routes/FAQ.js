import express from "express";
import {
  addFAQ,
  getAllFAQ,
  getFAQByID,
  removeFAQ,
  updateFAQ,
} from "../controllers/FAQ.js";

const router = express.Router();

router.post("/add", addFAQ);
router.post("/update", updateFAQ);
router.post("/remove", removeFAQ);
router.get("/", getAllFAQ);
router.post("/get-by-id", getFAQByID);

export { router as FAQRouter };
