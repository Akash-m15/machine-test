import express from "express";
import { connectDB } from "./db";
import { apiLimiter } from "./utils/rateLimiter";
import authRoutes from "./routes/auth";
import agentRoutes from "./routes/agent"
import taskRoutes from "./routes/task"
import cors from "cors";
import verifyAdmin from "./middleware/verifyAdmin";
import cookieParser from "cookie-parser";


const app = express();
connectDB().then(() =>
  console.log("Connected to DB"));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser());

app.use("/api/tasks", express.text({ type: "text/plain" }));

app.use('/api/',apiLimiter);
app.use('/api/auth',authRoutes);
app.use('/api/agents',verifyAdmin ,agentRoutes);
app.use('/api/tasks',verifyAdmin,taskRoutes)



app.listen("3000", () => {
  console.log("Server has started ")
})




//cookie - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNmYTgzNmJlYWQ2OTU0ZGU2ZWM4ZTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg0Mzk1MDUsImV4cCI6MTc1OTA0NDMwNX0.wW7DJyBBxXUkdO7VNwUbgNyqoGtyNqkJF4J81oX0-qY