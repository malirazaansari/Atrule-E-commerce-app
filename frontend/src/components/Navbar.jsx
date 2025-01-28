import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white">
      <div className="flex justify-between items-center mx-auto px-4 w-full h-16 container">
        <Link
          to="/"
          className="font-bold text-xl"
        >
          E-Commerce
        </Link>

        <div className="md:flex space-x-6 hidden">
          <Link
            to="/"
            className="hover:underline"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="hover:underline"
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="hover:underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:underline"
          >
            Register
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <Link
            to="/"
            className="block hover:bg-blue-700 px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="block hover:bg-blue-700 px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="block hover:bg-blue-700 px-4 py-2"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
