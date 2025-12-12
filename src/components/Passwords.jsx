import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Passwords = () => {
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const deletePassword = (id) => {
    if (confirm("Delete this password permanently?")) {
      const newPass = passwordArray.filter(item => item.id !== id);
      setpasswordArray(newPass);
      localStorage.setItem("passwords", JSON.stringify(newPass));
      toast.success("Password Deleted");
    }
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard!", { autoClose: 1000 });
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 mb-20">
      <ToastContainer position="top-right" theme="light" />
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-900">Your Saved Passwords</h1>

      {passwordArray.length === 0 && (
        <div className="text-center text-xl text-gray-500 mt-10">No passwords found. Go to Dashboard to add one!</div>
      )}

      {/* CARDS GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passwordArray.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500 hover:scale-105 transition-transform duration-200">
            
            {/* Header: Site URL */}
            <div className="flex justify-between items-start mb-4 pb-2 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 truncate w-3/4">{item.site}</h3>
              <a href={item.site.startsWith('http') ? item.site : `https://${item.site}`} target="_blank" className="text-pink-500 hover:text-pink-700">
                {/* <img src="/link.svg" width={20} alt="link" className="opacity-50 hover:opacity-100" /> */}
                <lord-icon
                    src="https://cdn.lordicon.com/zuxshggu.json"
                    trigger="hover"
                    style={{"width":"25px","height":"25px"}}>
                </lord-icon>
              </a>
            </div>

            {/* Content: User & Pass */}
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-pink-50 p-2 rounded-md">
                <span className="text-sm text-gray-600 truncate w-32">{item.username}</span>
                <img onClick={() => copyText(item.username)} src="/copy.png" width={18} className="cursor-pointer opacity-60 hover:opacity-100" alt="copy" />
              </div>
              
              <div className="flex justify-between items-center bg-pink-50 p-2 rounded-md">
                <span className="text-sm text-gray-600 truncate w-32">••••••••</span>
                <div className="flex gap-2">
                    <img onClick={() => copyText(item.password)} src="/copy.png" width={18} className="cursor-pointer opacity-60 hover:opacity-100" alt="copy" />
                </div>
              </div>
            </div>

            {/* Footer: Actions */}
            <div className="mt-4 flex justify-end">
              <button onClick={() => deletePassword(item.id)} className="text-red-500 text-sm font-semibold hover:underline flex items-center gap-1">
                Delete <span className="text-xl">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passwords;