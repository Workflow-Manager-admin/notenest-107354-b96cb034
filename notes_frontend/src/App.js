import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import Auth from "./components/Auth";
import useNotes from "./hooks/useNotes";

/**
 * PUBLIC_INTERFACE
 * Main App for NoteNest: notebook-style notes with glassmorphism, auth, and themes.
 */
function App() {
  // Theme state and persistence
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("noteapp_theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("noteapp_theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  // Auth state
  const [user, setUser] = useState(() => localStorage.getItem("noteapp_user") || "");
  const handleLogin = (username) => setUser(username);
  const handleLogout = () => {
    localStorage.removeItem("noteapp_user");
    setUser("");
  };

  // Note management
  const {
    notes,
    activeNoteId,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    searchNotes,
  } = useNotes(user);

  // Search state
  const [search, setSearch] = useState("");
  // Clear search when switching user
  useEffect(() => setSearch(""), [user]);

  // Filtered notes for search
  const visibleNotes = search ? searchNotes(search) : notes;

  // UI: Render
  if (!user)
    return (
      <div className="App">
        <Navbar
          onToggleTheme={toggleTheme}
          theme={theme}
          user={null}
          onLogout={handleLogout}
        />
        <Auth onLogin={handleLogin} />
      </div>
    );

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Navbar
        onToggleTheme={toggleTheme}
        theme={theme}
        user={user}
        onLogout={handleLogout}
      />
      <main className="app-main-layout" style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 70px)"
      }}>
        {/* Sidebar with search and note list */}
        <Sidebar
          notes={visibleNotes}
          activeNoteId={activeNoteId}
          onSelectNote={selectNote}
          onAddNote={createNote}
        >
          <SearchBar query={search} onChange={setSearch} />
        </Sidebar>
        {/* Main note editor */}
        <section className="main-editor-section" style={{flexGrow: 1, minHeight: 0, width: "100%"}}>
          {activeNote ? (
            <NoteEditor
              note={activeNote}
              onSave={updateNote}
              onDelete={deleteNote}
              onChange={updateNote}
            />
          ) : (
            <div className="note-editor-glass blank">
              Select or create a note to start writing!
            </div>
          )}

          {/* This area may be used for search-mode: list all results */}
          {search && (
            <div style={{
              margin: "1.9em auto 0 auto",
              width: "min(92vw, 520px)"
            }}>
              <NoteList
                notes={visibleNotes}
                onSelect={selectNote}
                onDelete={deleteNote}
                selectedId={activeNoteId}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
