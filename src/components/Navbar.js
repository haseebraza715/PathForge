import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-darkCard shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-accent">
            PathForge
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-textLight focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/dashboard"
              className={`text-textLight hover:text-accent transition ${
                isActive("/dashboard") ? "font-bold text-accent" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className={`text-textLight hover:text-accent transition ${
                isActive("/create") ? "font-bold text-accent" : ""
              }`}
            >
              Create Roadmap
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4">
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className={`block px-4 py-2 text-textLight hover:bg-gray-700 ${
                isActive("/dashboard") ? "font-bold text-accent" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              onClick={closeMenu}
              className={`block px-4 py-2 text-textLight hover:bg-gray-700 ${
                isActive("/create") ? "font-bold text-accent" : ""
              }`}
            >
              Create Roadmap
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
