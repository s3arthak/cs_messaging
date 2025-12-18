import express from "express";
import http from "http";
import{Server} from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { importCsv } from "./utils/importCsv.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Agent connected:", socket.id);
});
app.set("io", io);


await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

      await importCsv();


app.use("/api/messages", messageRoutes);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port 5000");
});
