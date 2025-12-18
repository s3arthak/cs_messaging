import React from "react";

import { useState } from "react";
import { sendReply } from "../api";

export default function ReplyBox({ messageId }) {
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return;
    await sendReply(messageId, text);
    setText("");
    alert("Reply sent");
  };

  return (
    <div className="reply">
      <textarea
        value={text}
        placeholder="Type your reply..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={submit}>Send Reply</button>
    </div>
  );
}
