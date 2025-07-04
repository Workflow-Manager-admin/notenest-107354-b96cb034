import { useState, useEffect } from "react";

/** Generates a unique (timestamp + rand) id for a note */
const newId = () => `${Date.now()}-${Math.floor(Math.random()*1e8)}`;
/** Key used for localStorage */
const STORAGE_KEY = "noteapp_notes";

/** 
 * PUBLIC_INTERFACE
 * Custom hook to manage all note CRUD and persistence in localStorage.
 */
function useNotes(user) {
  /**
   * @param {string} user - The user whose notes to manage.
   * @returns {Object} note state, actions, and helpers.
   */
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // Load notes from storage on mount or user change
  useEffect(() => {
    if (!user) {
      setNotes([]);
      setActiveId(null);
      return;
    }
    const allNotesJson = localStorage.getItem(STORAGE_KEY);
    let allNotes = {};
    try { allNotes = allNotesJson ? JSON.parse(allNotesJson) : {}; } catch { allNotes = {}; }
    if (!allNotes[user]) allNotes[user] = [];
    setNotes(allNotes[user]);
    if (allNotes[user].length) setActiveId(allNotes[user][0].id);
    else setActiveId(null);
  }, [user]);

  // Persist notes to storage whenever they change
  useEffect(() => {
    if (!user) return;
    const allNotesJson = localStorage.getItem(STORAGE_KEY);
    let allNotes = {};
    try { allNotes = allNotesJson ? JSON.parse(allNotesJson) : {}; } catch { allNotes = {}; }
    allNotes[user] = notes;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotes));
  }, [notes, user]);

  // PUBLIC_INTERFACE
  function createNote() {
    const newNote = {
      id: newId(),
      title: "",
      content: "",
      created: Date.now(),
      updated: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveId(newNote.id);
  }

  // PUBLIC_INTERFACE
  function updateNote(note) {
    setNotes((notes) =>
      notes.map((n) => (n.id === note.id ? { ...note, updated: Date.now() } : n))
    );
  }

  // PUBLIC_INTERFACE
  function deleteNote(id) {
    setNotes((notes) => notes.filter((n) => n.id !== id));
    setActiveId((curr) => (curr === id && notes.length > 1 ? notes.find(n => n.id !== id).id : null));
  }

  // PUBLIC_INTERFACE
  function selectNote(id) {
    setActiveId(id);
  }

  // PUBLIC_INTERFACE
  function searchNotes(query) {
    const lower = query.trim().toLowerCase();
    if (!lower) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lower) ||
        note.content.toLowerCase().includes(lower)
    );
  }

  const activeNote = notes.find((n) => n.id === activeId) || null;

  return {
    notes,
    activeNoteId: activeId,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    searchNotes,
    setNotes
  };
}

export default useNotes;
