import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket=io(`https://code-snippet-cdmx.onrender.com`)

socket.on("connect", () => {
  console.log("Connected to socket:", socket.id);
});

export default socket;