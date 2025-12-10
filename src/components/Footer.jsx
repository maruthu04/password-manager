import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-center py-4 bg-pink-100 mt-10 text-sm text-slate-700 fixed bottom-0 w-full">
        <p className="font-semibold">© 2025 PassVault — All data stored locally in your browser.</p>
        <a
          href="https://github.com/maruthu04/password-manager"
          target="_blank"
          className="text-pink-800 hover:underline "
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Footer;
