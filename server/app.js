import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import snippetRoutes from './routes/snippetRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from "dotenv";
dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: process.env.VITE_BASE_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", snippetRoutes);
app.get("/", (req, res) => {
  res.send("Snippet API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});