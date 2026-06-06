import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/favicon.jpg" alt="Urban Harvest Hub logo" className="logo-img" />
        <span>Urban Harvest Hub</span>
      </div>

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>

        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>

        <Link to="/workshops" onClick={() => setMenuOpen(false)}>Workshops</Link>

        <div className="mobile-controls">
          <LanguageSelector />
          <button
            className="theme-btn"
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="nav-right">
        <LanguageSelector />
      </div>

      <div className="controls">
        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;