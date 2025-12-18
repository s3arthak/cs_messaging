import express from "express";
import Message from "../models/Message.js";
import Reply from "../models/Reply.js";
import getUrgency from "../utils/urgency.js";

const router = express.Router();

/* GET messages with search */
router.get("/", async (req, res) => {
  const search = req.query.search || "";

  const messages = await Message.find({
    body: { $regex: search, $options: "i" }   // ✅ FIX
  }).sort({ urgency: -1, createdAt: -1 });

  res.json(messages);
});

/* Create message */
router.post("/", async (req, res) => {
  const { body } = req.body;

  const message = await Message.create({
    body,
    urgency: getUrgency(body)
  });

  res.json(message);
});

/* Agent reply */
router.post("/:id/reply", async (req, res) => {
  const reply = await Reply.create({
    messageId: req.params.id,
    replyText: req.body.text,
    agent: req.body.agent
  });

  res.json(reply);
});

/* Get replies */
router.get("/:id/replies", async (req, res) => {
  const replies = await Reply.find({ messageId: req.params.id });
  res.json(replies);
});

export default router;
