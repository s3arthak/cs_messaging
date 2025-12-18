const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function getMessages(search = "") {
  const res = await fetch(
    `${API_BASE_URL}/api/messages?search=${encodeURIComponent(search)}`
  );
  return res.json();
}

export async function sendReply(messageId, text) {
  const res = await fetch(
    `${API_BASE_URL}/api/messages/${messageId}/reply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    }
  );
  return res.json();
}

export async function getReplies(messageId) {
  const res = await fetch(
    `${API_BASE_URL}/api/messages/${messageId}/replies`
  );
  return res.json();
}
