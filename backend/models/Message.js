import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userId: Number,
    timestamp: Date,
    body: {
      type: String,
      required: true
    },
    urgency: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
messageSchema.index(
  { userId: 1, body: 1, createdAt: 1 },
  { unique: true }
);


export default mongoose.model("Message", messageSchema);
