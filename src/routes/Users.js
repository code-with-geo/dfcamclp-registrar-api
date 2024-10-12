import express from "express";
import {
  addUsers,
  getAllUser,
  getUserByID,
  loginUser,
  removeUser,
  updateUsers,
} from "../controllers/Users.js";
const router = express.Router();

router.post("/add", addUsers);
router.post("/update", updateUsers);
router.post("/remove", removeUser);
router.post("/login", loginUser);
router.post("/", getAllUser);
router.post("/get-by-id", getUserByID);

export { router as UserRouter };
