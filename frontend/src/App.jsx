import React, { useEffect, useState } from "react";
import { getMessages } from "./api";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MessageList from "./components/MessageList";
import MessageView from "./components/MessageView";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";
import { io } from "socket.io-client";
const SOCKET_URL =
import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const socket = io(SOCKET_URL);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function App() {
const [messages, setMessages] = useState([]);
const [selected, setSelected] = useState(null);
const [replies, setReplies] = useState([]);         
const [loading, setLoading] = useState(true);
const [searchQuery, setSearchQuery] = useState(""); 
const [sortMode, setSortMode] = useState("time");

  const loadMessages = async (query = "") => {
    setSearchQuery(query); 
    setLoading(true);
    const data = await getMessages(query);
    setMessages(data);
    setLoading(false);
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if (sortMode === "urgency") {
      return b.urgency - a.urgency;   
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  }
);

  useEffect(() => {
  loadMessages();

  socket.on("new-message", (message) => {
    setMessages((prev) => [message, ...prev]);
  });

  return () => {
    socket.off("new-message");
  };
}, []);


  const handleSelectMessage = async (message) => {
    setSelected(message);

    const res = await fetch(
      `${API_BASE_URL}/api/messages/${message._id}/replies`
    );
    const data = await res.json();
    setReplies(data);
  };

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={loadMessages} />

        <div className="layout">
          <div className="left-panel">
            {/* SORT CONTROLS */}
            <div className="sort-bar">
              <button
                className={`sort-btn ${sortMode === "time" ? "active" : ""}`}
                onClick={() => setSortMode("time")}
              >
                Latest
              </button>

              <button
                className={`sort-btn ${sortMode === "urgency" ? "active" : ""}`}
                onClick={() => setSortMode("urgency")}
              >
                Urgent First
              </button>
            </div>

            {loading ? (
              <Loading />
            ) : (
              <MessageList
                messages={sortedMessages}
                onSelect={handleSelectMessage}
                selectedId={selected?._id}
                searchQuery={searchQuery}
              />
            )}
          </div>

      {selected ? (
        <MessageView
          message={selected}
          replies={replies}
          setReplies={setReplies}
          allMessages={messages}
        />
      ) : (
        <EmptyState />
      )}
    </div>
    </div>
  );
}
