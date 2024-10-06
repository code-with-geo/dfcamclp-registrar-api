import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING);

app.listen(process.env.PORT, () => {
	console.log("Server is running on port: " + process.env.PORT);
});
