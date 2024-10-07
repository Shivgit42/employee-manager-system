import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          <Link to="/">Employee Manager</Link>
        </h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-gray-300 hover:text-white focus:outline-none transition duration-200"
          >
            Menu
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg">
              <li className="hover:bg-gray-600">
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-gray-300 hover:text-white transition duration-200"
                >
                  Signup
                </Link>
              </li>
              <li className="hover:bg-gray-600">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-300 hover:text-white transition duration-200"
                >
                  Login
                </Link>
              </li>
              <li className="hover:bg-gray-600">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:text-white transition duration-200"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
