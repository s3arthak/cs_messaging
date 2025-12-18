import React, { useState, useEffect, useRef } from "react";
import { sendReply } from "../api";
import CustomerInfo from "./CustomerInfo";

export default function MessageView({ message, replies, setReplies, allMessages }) {
  const [replyText, setReplyText] = useState("");
  const bottomRef = useRef(null);

  async function handleSendReply() {
    if (!replyText.trim()) return;

    const newReply = await sendReply(message._id, replyText);
    setReplies(prev => [...prev, newReply]);
    setReplyText("");
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [replies]);
   
  return (
    <div className="viewer">
      <CustomerInfo message={message} allMessages={allMessages} />
      <div className="conversation">
        <div className="customer-message">
          <strong>User {message.userId}</strong>
          <p>{message.body}</p>
        </div>

        {replies.map(reply => (
          <div key={reply._id} className="agent-reply">
            <strong>{reply.agent}</strong>
            <p>{reply.replyText}</p>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <textarea
        placeholder="Type your reply..."
        value={replyText}
        onChange={e => setReplyText(e.target.value)}
      />

      <button onClick={handleSendReply}>Send Reply</button>
    </div>
  );
}
