import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true
    },
    replyText: {
      type: String,
      required: true
    },
    agent: {
      type: String,
      default: "Agent"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reply", replySchema);
