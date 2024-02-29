import React from "react";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const Input = () => {
  return (
    <>
      <div className="h-full w-full grid grid-cols-9 bg-slate-300 py-2">
        <input
          type="text"
          placeholder="Message"
          className="w-[100%] bg-transparent h-full col-span-8 outline-none px-3 text-gray-700"
        />
        <div className="flex flex-row text-lg col-span-1 gap-4 w-full items-center justify-end px-4">
          <label htmlFor="file" className=" text-gray-600 cursor-pointer">
            <input type="file" className=" hidden" id="file" />
            <IoMdAttach className="text-3xl" />
          </label>
          <button className="bg-blue-800 hover:bg-blue-600 rounded-full h-8 w-8 min-w-8 flex justify-center items-center text-white">
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
