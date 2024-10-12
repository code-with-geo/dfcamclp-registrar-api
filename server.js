import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import { DepartmentRouter } from "./src/routes/Departments.js";
import { UserRouter } from "./src/routes/Users.js";
import { FAQRouter } from "./src/routes/FAQ.js";
import { AnnouncementRouter } from "./src/routes/Announcement.js";
import { InquiryCredentialRouter } from "./src/routes/InquiryCredential.js";

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use("/departments", DepartmentRouter);
app.use("/users", UserRouter);
app.use("/faqs", FAQRouter);
app.use("/announcements", AnnouncementRouter);
app.use("/inquiry-credentials", InquiryCredentialRouter);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: " + process.env.PORT);
});
