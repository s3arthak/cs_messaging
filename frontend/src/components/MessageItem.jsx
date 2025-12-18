import React from "react";

function highlight(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

export default function MessageItem({
  message,
  selected,
  onClick,
  searchQuery
}) {
  const preview =
    message.body.length > 100
      ? message.body.slice(0, 100) + "..."
      : message.body;

  return (
    <div
      className={`message-item ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      <strong>User {message.userId}</strong>

      <p>{highlight(preview, searchQuery)}</p>

      {message.urgency >= 2 && (
        <span className="urgent">URGENT</span>
      )}
    </div>
  );
}
