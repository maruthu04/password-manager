

import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Removed 'flex' from the parent nav to allow the mobile menu to stack vertically
    <nav className="p-4 shadow-md bg-pink-100 sticky top-0 z-50">
      <div className="flex justify-around items-center">
        
        {/* LOGO */}
        <div className="text-3xl text-slate-800 cursor-pointer font-bold ">
          <span className="text-pink-800">&lt;</span>
          Pass
          <span className="text-pink-800">Vault/&gt;</span>
        </div>

        {/* DESKTOP MENU - Hidden on mobile (below md), visible on desktop */}
        <ul className="hidden md:flex text-xl gap-8">
          <li className="transition-all hover:cursor-pointer hover:scale-105">
            Dashboard
          </li>
          <li className="transition-all hover:cursor-pointer hover:scale-105">
            Passwords
          </li>
          <li className="transition-all hover:cursor-pointer hover:scale-105">
            Password Generator
          </li>
        </ul>

        {/* RIGHT SIDE: GitHub + Hamburger */}
        <div className="flex items-center gap-4">
          <button className="hover:scale-110 transition cursor-pointer flex items-center">
            <a href="https://github.com/maruthu04/password-manager" target="_blank"><img src="/github.svg" width={40} alt="GitHub" /></a>
          </button>

          {/* HAMBURGER ICON - Visible only on mobile (below md) */}
          <button
            className="md:hidden text-slate-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              // X (Close) Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger (Menu) Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN - Only shows when isOpen is true */}
      {isOpen && (
        <div className="md:hidden mt-4 border-t border-pink-200 pt-4 flex flex-col items-center gap-4 bg-pink-100 transition-all duration-300">
          <div className="text-xl font-medium transition-all hover:cursor-pointer hover:text-pink-600">
            Dashboard
          </div>
          <div className="text-xl font-medium transition-all hover:cursor-pointer hover:text-pink-600">
            Passwords
          </div>
          <div className="text-xl font-medium transition-all hover:cursor-pointer hover:text-pink-600">
            Password Generator
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
