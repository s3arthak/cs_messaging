import React from "react";
export default function SearchBar({ onSearch }) {
  return (
    <input
      className="search"
      placeholder="Search messages..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
