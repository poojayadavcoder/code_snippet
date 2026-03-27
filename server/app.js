import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import snippetRoutes from './routes/snippetRoutes.js'
import dotenv from "dotenv";
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", snippetRoutes);
app.get("/", (req, res) => {
  res.send("Snippet API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});