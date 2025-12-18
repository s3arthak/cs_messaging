import MessageItem from "./MessageItem";
import React from "react";

export default function MessageList({ messages, onSelect, selectedId, searchQuery   }) {
  if (!messages.length) {
    return <p className="empty">No messages found</p>;
  }

  return (
    <div className="list">
      {messages.map((msg) => (
        <MessageItem
          key={msg._id}
          message={msg}
          selected={msg._id === selectedId}
          onClick={() => onSelect(msg)}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
