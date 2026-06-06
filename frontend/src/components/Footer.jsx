import { Link } from "react-router-dom";
import NotificationButton from "./NotificationButton";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <h2>Urban Harvest Hub</h2>
          <p>Sustainable living for everyone.</p>
        </div>

        <div className="footer-links" aria-label="Footer navigation">
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/products">Products</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-actions">
          <p>Stay updated with notifications:</p>
          <NotificationButton />
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {year} Urban Harvest Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;