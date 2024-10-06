import express from "express";
import { addDepartment } from "../controllers/Departments.js";

const router = express.Router();

router.post("/add", addDepartment);

export {router as DepartmentRouter};