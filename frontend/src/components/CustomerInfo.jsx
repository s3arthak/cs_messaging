import React from "react";

export default function CustomerInfo({ message, allMessages }) {
  const userMessages = allMessages.filter(
    (m) => m.userId === message.userId
  );

  const firstSeen = new Date(
    Math.min(...userMessages.map(m => new Date(m.createdAt)))
  ).toLocaleDateString();

  return (
    <div className="customer-info">
      <h4>Customer Info</h4>

      <div className="info-row">
        <span>User ID</span>
        <strong>{message.userId}</strong>
      </div>

      <div className="info-row">
        <span>Total Messages</span>
        <strong>{userMessages.length}</strong>
      </div>

      <div className="info-row">
        <span>First Contact</span>
        <strong>{firstSeen}</strong>
      </div>

      <div className="info-row">
        <span>Customer Type</span>
        <strong>
          {userMessages.length > 1 ? "Returning" : "New"}
        </strong>
      </div>

      <div className="info-row">
        <span>Account Status</span>
        <strong>Active</strong>
      </div>

      <a href="#" onClick={(e) => e.preventDefault()} className="profile-link">
        View internal profile →
      </a>
    </div>
  );
}
