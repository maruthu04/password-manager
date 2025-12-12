import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 shadow-md bg-pink-100/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-around items-center cursor-pointer">
        
        <div className="text-3xl text-slate-800 font-bold">
          <span className="text-pink-800">&lt;</span>
          Pass
          <span className="text-pink-800">Vault/&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-xl gap-8 font-medium">
          <NavLink to="/" className={({isActive}) => isActive ? "text-pink-600 font-bold" : "hover:text-pink-600 transition-all"}>
            Dashboard
          </NavLink>
          <NavLink to="/passwords" className={({isActive}) => isActive ? "text-pink-600 font-bold" : "hover:text-pink-600 transition-all"}>
            Passwords
          </NavLink>
          <NavLink to="/generator" className={({isActive}) => isActive ? "text-pink-600 font-bold" : "hover:text-pink-600 transition-all"}>
            Generator
          </NavLink>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="hover:scale-110 transition cursor-pointer flex items-center">
            <img src="/github.svg" width={40} alt="GitHub" />
          </button>

          {/* Hamburger */}
          <button className="md:hidden text-slate-800 focus:outline-none" onClick={toggleMenu}>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 border-t border-pink-200 pt-4 flex flex-col items-center gap-4">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="text-xl font-medium hover:text-pink-600">Dashboard</NavLink>
          <NavLink to="/passwords" onClick={() => setIsOpen(false)} className="text-xl font-medium hover:text-pink-600">Passwords</NavLink>
          <NavLink to="/generator" onClick={() => setIsOpen(false)} className="text-xl font-medium hover:text-pink-600">Generator</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;