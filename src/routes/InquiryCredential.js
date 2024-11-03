import express from "express";
import {
  addInquiryCredential,
  getAllInquiryCredential,
  getInquiryCredentialByDepartment,
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
router.post("/get-by-department", getInquiryCredentialByDepartment);
export { router as InquiryCredentialRouter };
