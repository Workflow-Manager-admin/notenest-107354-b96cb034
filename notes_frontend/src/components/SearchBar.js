import React from "react";
import "./SearchBar.css";

// PUBLIC_INTERFACE
function SearchBar({ query, onChange }) {
  /**
   * Search bar for filtering notes by title/content.
   */
  return (
    <div className="search-bar-glassy">
      <input
        className="search-input"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes…"
        aria-label="Search notes"
        maxLength={64}
        autoComplete="off"
      />
    </div>
  );
}
export default SearchBar;
