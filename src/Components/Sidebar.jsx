import React, { useContext } from "react";
import "../index.css";
import Sidebarnav from "./Sidebarnav";
import Search from "./Search";
import Chats from "./Chats";
import { ChatContext } from "../authRelated/ChatContext";
import { CiMenuBurger } from "react-icons/ci";

const Sidebar = () => {
  const { isOpen } = useContext(ChatContext);
  const { togglePopup } = useContext(ChatContext);
  return (
    <div
      className={`${
        isOpen === false ? "w-0" : "w-full"
      } absolute md:relative h-full transition-all duration-300 max-w-[300px] md:max-w-80`}
    >
      <div
        className={`${
          isOpen === false
            ? "visible delay-300 translate-x-[0] h-full w-0 "
            : "-translate-x-[100%] invisible  "
        } transition-all text-2xl`}
      >
        <div className="h-full absolute flex justify-center items-center">
          <button
            className={` absolute  z-[60] h-full -right-5 flex items-center `}
            onClick={() => togglePopup()}
          >
            <CiMenuBurger className="text-[1.5rem] w-10 h-20 p-2 rounded-full bg-gray-600 text-white" />
          </button>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? "translate-x-[0] flex-col relative visible"
            : "-translate-x-[100%] w-full absolute invisible "
        }  z-50 transition-all duration-300 top-0 left-0 bg-gray-400 max-w-[300px] md:max-w-80 md:min-w-80 h-full w-full sm:w-80`}
      >
        <div className=" max-h-40">
          <div className=" right-0 text-2xl h-full absolute flex justify-center items-center">
            <button
              className="absolute z-[60] -right-5"
              onClick={() => togglePopup()}
            >
              <CiMenuBurger className="text-[1.5rem] w-10 h-20 p-2 rounded-full bg-gray-600 text-white" />
            </button>
          </div>
          <div className="relative z-50">
            <Sidebarnav />
          </div>
        </div>
        <Search />
        <Chats />
      </div>
    </div>
  );
};

export default Sidebar;
