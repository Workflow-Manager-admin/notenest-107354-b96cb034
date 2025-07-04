import React from "react";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar({ onToggleTheme, theme, user, onLogout }) {
  /** 
   * Application top navigation bar with brand, theme toggle, user info, and logout action.
   */
  return (
    <nav className="navbar glassy-navbar">
      <div className="navbar-brand">
        <span role="img" aria-label="notebook" className="logo-icon">📓</span>
        NoteNest
      </div>
      <div className="navbar-actions">
        <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === "light" ? <span>🌙</span> : <span>☀️</span>}
        </button>
        {user && (
          <span className="navbar-user">
            <span className="user-icon" role="img" aria-label="user">👤</span>
            {user}
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
