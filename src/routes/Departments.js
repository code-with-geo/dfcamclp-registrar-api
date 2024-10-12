import express from "express";
import {
  addDepartment,
  removeDepartment,
  updateDepartment,
  getAllDepartment,
  getDepartmentByID,
} from "../controllers/Departments.js";

const router = express.Router();

router.post("/add", addDepartment);
router.post("/update", updateDepartment);
router.post("/remove", removeDepartment);
router.get("/", getAllDepartment);
router.post("/get-by-id", getDepartmentByID);

export { router as DepartmentRouter };
