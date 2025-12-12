import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Generator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPass, setGeneratedPass] = useState("");
  
  const [checkPass, setCheckPass] = useState("");
  const [strength, setStrength] = useState("");
  const [barColor, setBarColor] = useState(""); 
  const [barWidth, setBarWidth] = useState("0%"); 

  const generate = () => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPass(pass);
  };

  const copyPass = () => {
    navigator.clipboard.writeText(generatedPass);
    toast.success("Password Copied!");
  }

  const checkStrength = (e) => {
    const val = e.target.value;
    setCheckPass(val);
    
    // Reset if empty
    if(val.length === 0) { 
        setStrength(""); 
        setBarWidth("0%");
        return; 
    }

    // Logic for Strength
    // 1. Weak: Less than 6 characters
    if(val.length < 6) { 
        setStrength("Weak"); 
        setBarColor("bg-red-500");
        setBarWidth("30%");
        return; 
    }

    // 2. Medium: Less than 10 chars OR missing numbers/symbols
    if(val.length < 10 || !val.match(/[0-9]/) || !val.match(/[!@#$%^&*]/)) { 
        setStrength("Medium"); 
        setBarColor("bg-yellow-500");
        setBarWidth("60%");
        return; 
    }

    // 3. Strong: 10+ chars AND has numbers AND has symbols
    if(val.length >= 10 && val.match(/[0-9]/) && val.match(/[!@#$%^&*]/)) {
        setStrength("Strong");
        setBarColor("bg-green-500");
        setBarWidth("100%");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 flex flex-col md:flex-row gap-8 pb-20">
      <ToastContainer position="top-right" theme="light" />

      {/* Section 1: Generator */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-pink-200">
        <h2 className="text-2xl font-bold text-pink-800 mb-4">Password Generator</h2>
        
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-4">
            <span className="font-mono text-lg truncate w-48 text-gray-700">{generatedPass || "Click Generate"}</span>
            <button onClick={copyPass} className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition-colors">Copy</button>
        </div>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Length: {length}</label>
                <input type="range" min="6" max="30" value={length} onChange={(e)=>setLength(e.target.value)} className="w-full accent-pink-500 cursor-pointer" />
            </div>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={includeNumbers} onChange={()=>setIncludeNumbers(!includeNumbers)} className="accent-pink-500 w-4 h-4" /> Numbers
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={includeSymbols} onChange={()=>setIncludeSymbols(!includeSymbols)} className="accent-pink-500 w-4 h-4" /> Symbols
                </label>
            </div>
            <button onClick={generate} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-bold transition-all shadow-md">Generate Password</button>
        </div>
      </div>

      {/* Section 2: Finder / Strength Checker */}
      <div className="flex-1 bg-pink-50 p-6 rounded-xl shadow-lg border border-pink-200">
        <h2 className="text-2xl font-bold text-pink-800 mb-4">Password Check</h2>
        <p className="text-sm text-gray-600 mb-4">Check how strong your password is.</p>
        
        <input 
            type="text" 
            value={checkPass}
            onChange={checkStrength}
            placeholder="Type a password..." 
            className="w-full p-3 rounded-lg border border-pink-300 focus:outline-pink-500 focus:ring-1 focus:ring-pink-500 mb-2"
        />

        {/* Strength Bar Indicator */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-3">
            <div 
                className={`h-full transition-all duration-500 ease-out ${barColor}`} 
                style={{ width: barWidth }}
            ></div>
        </div>

        {/* Strength Text Label */}
        <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">Strength:</span>
            <span className={`font-bold transition-colors duration-300 ${barColor ? barColor.replace('bg-', 'text-') : 'text-gray-400'}`}>
                {strength || "None"}
            </span>
        </div>
      </div>
    </div>
  );
};

export default Generator;