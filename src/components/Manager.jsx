import React from "react";
import { useRef, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (passwordRef.current.type.includes("password")) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
    if (ref.current.src.includes("/eye.png")) {
      ref.current.src = "/eyecross.png";
    } else {
      ref.current.src = "/eye.png";
    }
  };

  const savePassword = () => {
    const site = form.site.trim();
    const username = form.username.trim();
    const password = form.password.trim();
    const exists = passwordArray.some(
      (p) => p.site === site && p.username === username
    );
    if (exists) {
      toast.info("An entry for this site and username already exists.", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!site) {
      toast.error("Please enter website URL.", {
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!username) {
      toast.error("Please enter username / email.", {
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!password) {
      toast.error("Please enter password.", {
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setform({ site: "", username: "", password: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      savePassword();
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    if (confirm("Are you sure you want to delete this password?")) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
        
      );
      toast.success("Password Deleted");
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("copied to clipboard!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      {/* --- ADDED CUSTOM STYLES TO HIDE SCROLLBAR --- */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-pink-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-2 md:px-0 cursor-pointer">
        <h1 className="text-center text-2xl font-semibold">
          <span className="text-pink-800">&lt;</span>
          Pass
          <span className="text-pink-800">Vault/&gt;</span>
        </h1>
        <p className="text-center text-lg text-pink-700">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-3">
          <input
            onKeyDown={handleKeyPress}
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-pink-500 p-1 px-4 m-1 w-full focus:outline-pink-600"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row gap-2">
            <input
              onKeyDown={handleKeyPress}
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username/Email"
              className="rounded-full border border-pink-500 p-1 px-4 m-1 w-full md:w-1/2 focus:outline-pink-500"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full md:w-1/2">
              <input
                onKeyDown={handleKeyPress}
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-pink-500 p-1 px-4 m-1 w-full focus:outline-pink-500 "
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-3 top-[22%] cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} width={24} src="./eyecross.png" alt="eyecross" />
              </span>
            </div>
          </div>

          <div
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-pink-300 hover:bg-pink-200 rounded-full mx-auto w-fit px-4 py-2 md:px-8 mt-3 border border-pink-400 cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            <button className="font-semibold">
                <span className="block md:hidden">Save</span>
                <span className="hidden md:block">Save Password</span>
            </button>
          </div>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl text-center md:text-left py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-center md:text-left">No Passwords Saved Yet!</div>
          )}
          
          {passwordArray.length !== 0 && (
            // FIX: Added 'no-scrollbar' class here
            <div className="overflow-x-auto w-full mb-10 pb-4 no-scrollbar">
              <table className="table-auto w-full items-center rounded-md mt-4 min-w-[900px]">
                <thead className="bg-pink-600 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Passwords</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-pink-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 text-center w-32 border border-white break-all px-2">
                          <a
                            href={
                              item.site.startsWith("https")
                                ? item.site
                                : `https://${item.site}`
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.site}
                          </a>
                        </td>
                        <td className="py-2 text-center w-32 border border-white px-2">
                          <div className="flex justify-center items-center gap-1">
                            <span className="truncate max-w-[150px]">
                              {item.username}
                            </span>
                            <div
                              className="lordcopy cursor-pointer mt-1"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                                style={{ width: "18px", height: "18px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 text-center w-32 border border-white px-2">
                          <div className="flex justify-center items-center gap-1">
                            <span className="truncate max-w-[150px]">
                              {item.password}
                            </span>
                            <div
                              className="lordcopy cursor-pointer mt-1"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                                style={{ width: "18px", height: "18px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 text-center w-32 border border-white px-2">
                          <div className="flex justify-center items-center gap-2">
                            <span
                              className="mb-1 cursor-pointer"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <img width={16} src="./edit.png" alt="Edit" />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                trigger="hover"
                                style={{ width: "20px", height: "20px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;