import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import snippetRoutes from './routes/snippetRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { Server } from 'socket.io'
import http from "http"
import client from './redisClient.js'



const app = express();

connectDB();

app.set('trust proxy', 1);

app.use(cors({
  origin: process.env.VITE_BASE_URL,
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());


app.use("/api/auth", authRoutes);

app.use("/api", snippetRoutes);

app.get("/", (req, res) => {
  res.send("Snippet API Running");
});

const PORT = process.env.PORT || 5000;


const server=http.createServer(app)
console.log(process.env.VITE_BASE_URL)
/* socket setup */
const io = new Server(server, {
  cors: {
    origin: process.env.VITE_BASE_URL,
    // origin:"*",
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* start server */
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });