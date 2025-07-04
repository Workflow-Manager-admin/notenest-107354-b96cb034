import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ notes, activeNoteId, onSelectNote, onAddNote, children }) {
  /**
   * Sidebar for navigating between notes; includes add note button and children for search.
   */
  return (
    <aside className="sidebar glassy-sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button className="add-note-btn" onClick={() => onAddNote()}>＋</button>
      </div>
      {children}
      <div className="sidebar-list">
        {notes.length === 0 && <div className="sidebar-empty">No notes</div>}
        {notes.map((note) => (
          <button
            key={note.id}
            className={`sidebar-list-item${note.id === activeNoteId ? " selected" : ""}`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="note-title">{note.title || <em>(Untitled)</em>}</div>
            <div className="note-date">{(new Date(note.updated)).toLocaleString()}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
