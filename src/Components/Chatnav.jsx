import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoVideocam } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";

const Chatnav = () => {
  return (
    <>
      <nav className="flex flex-row justify-between h-full items-center p-2 bg-gray-500 text-white">
        <div className="relative group cursor-pointer flex flex-row items-center gap-2">
          <div className="w-full text-2xl">
            <button>
              <CiMenuBurger />
            </button>
          </div>
          <div className="flex flex-col">
            <img
              className=" h-8 object-cover object-center"
              src="https://static-00.iconduck.com/assets.00/user-avatar-1-icon-2048x2048-935gruik.png"
              alt="user"
            />
            user
          </div>
        </div>
        <div className="flex flex-row gap-2 text-xl mx-5">
          <button>
            <IoVideocam />
          </button>
          <button>
            <IoPersonAdd />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Chatnav;
