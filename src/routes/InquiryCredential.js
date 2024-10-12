import express from "express";
import {
  addInquiryCredential,
  getAllInquiryCredential,
  getInquiryCredentialByID,
  removeInquiryCredential,
  updateInquiryCredential,
} from "../controllers/InquiryCredential.js";

const router = express.Router();

router.post("/add", addInquiryCredential);
router.post("/update", updateInquiryCredential);
router.post("/remove", removeInquiryCredential);
router.get("/", getAllInquiryCredential);
router.post("/get-by-id", getInquiryCredentialByID);
export { router as InquiryCredentialRouter };
