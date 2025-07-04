import React, { useState } from "react";
import "./Auth.css";

// PUBLIC_INTERFACE
function Auth({ onLogin }) {
  /**
   * Simple local/browser-based authentication.
   * Persist user session in localStorage ("noteapp_user").
   */
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    localStorage.setItem("noteapp_user", trimmed);
    onLogin(trimmed);
  };

  return (
    <div className="auth-glass glass-container">
      <form onSubmit={handleLogin}>
        <h2 className="auth-title">Welcome to NoteNest</h2>
        <div className="auth-desc">Please enter your name to start:</div>
        <input
          className="auth-input"
          type="text"
          value={username}
          maxLength={40}
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
          aria-label="User Name"
          autoFocus
        />
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-login-btn" type="submit">Start</button>
      </form>
    </div>
  );
}

export default Auth;
