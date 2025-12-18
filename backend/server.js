import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { importCsv } from "./utils/importCsv.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

      await importCsv();


app.use("/api/messages", messageRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
