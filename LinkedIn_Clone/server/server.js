import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors());

// Route for authentication
app.use("/api/v2/auth", authRoutes);

//Adding Cookie Pareser
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
