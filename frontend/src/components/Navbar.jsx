import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
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
        <Link to="/">Home</Link>

        <Link to="/events">Events</Link>

        <Link to="/products">Products</Link>

        <Link to="/workshops">Workshops</Link>
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
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;