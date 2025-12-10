import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center p-4 shadow-md bg-pink-100">
      <div className="text-3xl text-slate-800 cursor-pointer font-bold ">
        <span className="text-pink-800">&lt;</span>
        Pass
        <span className="text-pink-800">Vault/&gt;</span>
      </div>
      <ul className="flex text-xl gap-8">
        <li className="transition-all hover:cursor-pointer hover:scale-105">
          Dashboard
        </li>
        <li className="transition-all hover:cursor-pointer hover:scale-105">
          Passwords
        </li>
        <li className="transition-all hover:cursor-pointer hover:scale-105">
          Password Genrator
        </li>
      </ul>
      <button className="hover:scale-110 transition cursor-pointer">
      <img src="/github.svg" width={40} alt="GitHub" />
    </button>
    </nav>
  );
};

export default Navbar;
