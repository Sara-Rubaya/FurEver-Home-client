import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaPaw, FaBars, FaTimes } from "react-icons/fa";

// Navbar - logo + nav links + login/register buttons
// Mobile e hamburger menu toggle kore
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-gray-700 hover:text-primary transition-colors";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/animals", label: "Browse Animals" },
    { to: "/report", label: "Report Animal" },
    { to: "/donate", label: "Donate" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-dark">
          <FaPaw className="text-primary" />
          FurEver Home
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="text-2xl text-dark md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <hr />
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700">
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="rounded-md bg-primary px-4 py-2 text-center text-white"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}
