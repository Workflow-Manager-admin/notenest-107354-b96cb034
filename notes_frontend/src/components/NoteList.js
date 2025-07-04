import React from "react";
import "./NoteList.css";

// PUBLIC_INTERFACE
function NoteList({ notes, onSelect, onDelete, selectedId }) {
  /** 
   * List view, reused as needed (not strictly necessary for sidebar, but maybe as search result listing area).
   */
  if (!notes.length) return <div className="note-list-empty">No notes found.</div>;
  return (
    <ul className="note-list-ul">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`note-list-li${selectedId === note.id ? " selected" : ""}`}
        >
          <div className="note-list-header" onClick={() => onSelect(note.id)}>
            <strong>{note.title || <em>(Untitled)</em>}</strong>
            <button className="delete-btn" onClick={() => onDelete(note.id)} title="Delete">🗑️</button>
          </div>
          <div className="note-list-snippet">
            {note.content.substring(0, 50)}
          </div>
          <div className="note-list-date">{(new Date(note.updated)).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
