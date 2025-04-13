import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json({ limit: "5mb" }));

// Middleware to handle CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Middleware to parse cookies
app.use(cookieParser());

// Route for authentication
app.use("/api/v2/auth", authRoutes);

// Route for user-related operations
app.use("/api/v2/users", userRoutes);

// Route for post-related operations
app.use("/api/v2/posts", postRoutes);

// Route for notification-related operations
app.use("/api/v2/notifications", notificationRoutes);

// Route for connection-related operations
app.use("/api/v2/connections", connectionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
