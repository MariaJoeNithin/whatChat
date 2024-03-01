import React, { useContext } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoVideocam } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { ChatContext } from "../authRelated/ChatContext";

const Chatnav = () => {
  const { data } = useContext(ChatContext);
  return (
    <>
      <nav className="flex flex-row justify-between h-full items-center p-2 bg-gray-500 text-white">
        <div className="relative group cursor-pointer flex flex-row items-center gap-2">
          <div className="w-full text-2xl">
            <button>
              <CiMenuBurger />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className=" min-h-8 h-8 w-8 min-w-8 rounded-full object-cover object-center"
              src={
                data?.user?.photoURL
                  ? data?.user?.photoURL
                  : "https://static-00.iconduck.com/assets.00/user-avatar-1-icon-2048x2048-935gruik.png"
              }
              alt="user"
            />
            {data?.user?.displayName}
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
