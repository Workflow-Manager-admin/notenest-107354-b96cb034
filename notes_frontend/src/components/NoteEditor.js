import React, {useEffect, useRef} from "react";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onDelete, onChange }) {
  /**
   * Main editor component for editing a selected note.
   */
  const titleRef = useRef();

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [note.id]);

  if (!note) {
    return <div className="note-editor-glass blank">Select or create a note to begin.</div>;
  }

  return (
    <div className="note-editor-glass glassy-editor">
      <div className="editor-row">
        <input
          ref={titleRef}
          className="note-title-input"
          type="text"
          value={note.title}
          placeholder="Note Title"
          maxLength={80}
          onChange={(e) => onChange({...note, title: e.target.value})}
        />
        <button className="delete-btn" onClick={() => onDelete(note.id)} title="Delete note">🗑️</button>
      </div>
      <textarea
        className="note-content-area"
        value={note.content}
        placeholder="Start writing your note..."
        rows={16}
        spellCheck="true"
        onChange={(e) => onChange({...note, content: e.target.value})}
      />
      <div className="editor-foot">
        <button className="save-btn" onClick={() => onSave(note)}>Save</button>
        <span className="note-updated-at">
          Last edited: {(new Date(note.updated)).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default NoteEditor;
