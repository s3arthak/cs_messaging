import React from "react";
function highlight(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

export default function MessageItem({ message, selected, onClick, searchQuery }) {
  return (
    <div
      className={`message-item ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      <strong>{message.name}</strong>
      <p>{message.body.slice(0, 100)}...</p>
       <p>{highlight(message.body, searchQuery)}</p>
      {message.urgency >= 4 && (
        <span className="urgent">URGENT</span>
      )}
    </div>
  );
}
