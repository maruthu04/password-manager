import React from "react";
import { useRef, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
    // console.log(ref.current.src);
    if (ref.current.src.includes("/eye.png")) {
      ref.current.src = "/eyecross.png";
    } else {
      ref.current.src = "/eye.png";
    }
  };

  const savePassword = () => {
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("🦄 Wow so easy!", {
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
    <>
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
      <div className="absolute inset-0 -z-10 h-full w-full bg-pink-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto mt-16">
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
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-pink-500 p-1 px-4 m-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex gap-2">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username/Email"
              className="rounded-full border border-pink-500 p-1 px-4 m-1 w-1/2"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-[47%]">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-pink-500 p-1 px-4 m-1 w-full"
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
            className="flex justify-center gap-1 bg-pink-300 hover:bg-pink-200 rounded-full mx-auto w-1/5 py-1 mt-3 border border-pink-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            <button>Add Password</button>
          </div>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords Saved Yet!</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full items-center rounded-md overflow-hidden mt-4">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="py-1">Site</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Passwords</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-pink-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center w-32 border border-white">
                        <a
                          href={
                            item.site.startsWith("https")
                              ? item.site
                              : `https://${item.site}`
                          }
                          target="_blank"
                        >
                          {item.site}
                        </a>
                      </td>
                      <td className="py-2 text-center w-32 border border-white">
                        <div className="flex justify-center items-center gap-1">
                          <span>{item.username}</span>
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
                      <td className="py-2 text-center w-32 border border-white">
                        <div className="flex justify-center items-center gap-1">
                          <span>{item.password}</span>
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
                      <td className="py-2 text-center w-32 border border-white">
                        <div className="flex justify-center items-center gap-1">
                          <span>
                            <lord-icon
                              src="https://cdn.lordicon.com/qawxkplz.json"
                              trigger="hover"
                              style={{"width":"25px", "height":"25px"}}
                            ></lord-icon>
                          </span>
                          <span>
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{"width":"25px", "height":"25px"}}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
