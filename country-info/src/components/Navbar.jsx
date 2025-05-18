import { Link, useLocation } from "react-router-dom";
import {
  FaGlobeAmericas,
  FaSuitcaseRolling,
  FaMapMarkedAlt,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <FaGlobeAmericas className="logo-icon" />
          <span>Where do you wanna go next !!</span>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <FaMapMarkedAlt className="nav-icon" />
            <span>Explore</span>
          </Link>
          <Link
            to="/bucket-list"
            className={`nav-link ${
              location.pathname === "/bucket-list" ? "active" : ""
            }`}
          >
            <FaSuitcaseRolling className="nav-icon" />
            <span>Bucket List</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 0.6rem 1.5rem;
          position: relative; /* Changed from sticky to relative as requested */
          z-index: 100;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #4a90e2, #6c5ce7);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          letter-spacing: 0.5px;
        }

        .logo-icon {
          margin-right: 0.5rem;
          font-size: 1.3rem;
        }

        .nav-links {
          display: flex;
          align-items: center;
        }

        .nav-link {
          margin-left: 1rem;
          color: #2d3436;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #4a90e2;
          background-color: rgba(74, 144, 226, 0.08);
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: #4a90e2;
          background-color: rgba(74, 144, 226, 0.12);
          box-shadow: 0 2px 5px rgba(74, 144, 226, 0.15);
        }

        .nav-icon {
          margin-right: 0.4rem;
          font-size: 0.9rem;
        }

        @media (max-width: 480px) {
          .nav-link span {
            display: none;
          }

          .nav-link {
            font-size: 1.1rem;
            padding: 0.4rem;
          }

          .nav-icon {
            margin-right: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
