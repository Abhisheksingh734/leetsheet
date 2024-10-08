import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-700 dark:bg-gray-800 sticky top-0 z-50 shadow-lg p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-500">LEETSHEET</h1>
        <ul className="flex space-x-6">
          <li>
            <a
              href="#home"
              className="text-gray-200 dark:text-gray-400 text-lg hover:text-orange-400 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-200 dark:text-gray-400 text-lg hover:text-orange-400 transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-200 dark:text-gray-400 text-lg hover:text-orange-400 transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
