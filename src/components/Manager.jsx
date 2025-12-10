import React from "react";

const Manager = () => {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto mt-16">
        <h1 className="text-center text-2xl">
          <span className="text-pink-800">&lt;</span>
          Pass
          <span className="text-pink-800">Vault/&gt;</span>
        </h1>
        <p className="text-center text-lg text-pink-700">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-3">
          <input
            className="rounded-full border border-pink-500 p-1 px-4 m-1"
            type="text"
            name=""
            id=""
          />
          <div className="flex gap-2">
            <input
              className="rounded-full border border-pink-500 p-1 px-4 m-1 w-1/2"
              type="text"
              name=""
              id=""
            />
            <input
              className="rounded-full border border-pink-500 p-1 px-4 m-1 w-1/2"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="flex justify-center gap-1 bg-pink-300 hover:bg-pink-400 rounded-full mx-auto w-1/5 py-1 mt-3">
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"></lord-icon>
            <button>Add Password</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
