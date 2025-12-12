import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "react-toastify/dist/ReactToastify.css";

const Passwords = () => {
  const [passwordArray, setpasswordArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const navigate = useNavigate();

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

  const editPassword = (item) => {
    // Navigate to Home (Dashboard) and pass the item data
    navigate("/", { state: { editData: item } });
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard!", { autoClose: 1000 });
    navigator.clipboard.writeText(text);
  };

  // Filter Logic
  const filteredPasswords = passwordArray.filter(item => 
    item.site.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 mb-20">
      <ToastContainer position="top-right" theme="light" />
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-pink-900">Your Saved Passwords</h1>
        
        {/* 1. SEARCH BAR */}
        <div className="relative w-full md:w-1/3">
            <input 
                type="text" 
                placeholder="Search passwords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-300 focus:outline-pink-500 shadow-sm"
            />
            {/* <img src="/search.svg" className="absolute left-3 top-2.5 w-4 opacity-50" alt="search" />  */}
            <lord-icon className="absolute left-3 top-2.5 "
              src="https://cdn.lordicon.com/rpviwvwn.json"
              trigger="hover"
              colors="primary:#110a5c,secondary:#110a5c"
              style={{"width":"25px","height":"25px"}}>
            </lord-icon>
            {/* Note: Ensure you have a search.svg or use a text emoji like 🔍 */}
        </div>
      </div>

      {filteredPasswords.length === 0 && (
        <div className="text-center text-xl text-gray-500 mt-10">No passwords found matching your search.</div>
      )}

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPasswords.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500 hover:scale-105 transition-transform duration-200">
            
            {/* Header: Favicon & Site URL */}
            <div className="flex justify-between items-start mb-4 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-3 w-3/4">
                  {/* 2. AUTO FAVICON */}
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${item.site}&sz=64`} 
                    alt="logo" 
                    className="w-8 h-8 rounded-full bg-gray-100 p-1"
                    onError={(e) => {e.target.src = "/globe.svg"}} // Fallback if no favicon
                  />
                  <h3 className="font-bold text-lg text-gray-800 truncate">{item.site}</h3>
              </div>
              <a href={item.site.startsWith('http') ? item.site : `https://${item.site}`} target="_blank" rel="noreferrer" className="text-pink-500 hover:text-pink-700">
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
                <img onClick={() => copyText(item.password)} src="/copy.png" width={18} className="cursor-pointer opacity-60 hover:opacity-100" alt="copy" />
              </div>
            </div>

            {/* Footer: Actions */}
            <div className="mt-4 flex justify-between items-center pt-2">
               {/* 3. EDIT BUTTON */}
              <button onClick={() => editPassword(item)} className="text-blue-500 text-sm font-semibold hover:underline flex items-center gap-1">
                 <lord-icon src="https://cdn.lordicon.com/wuvorxbv.json" trigger="hover" style={{width:"20px", height:"20px"}}></lord-icon>
                 Edit
              </button>
              
              <button onClick={() => deletePassword(item.id)} className="text-red-500 text-sm font-semibold hover:underline flex items-center gap-1">
                <lord-icon src="https://cdn.lordicon.com/drxwpfop.json" trigger="hover" colors="primary:#c71f16" style={{width:"20px", height:"20px"}}></lord-icon>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passwords;