import React from "react";
import "../index.css";
import Sidebarnav from "./Sidebarnav";
import Search from "./Search";
import Chats from "./Chats";


const Sidebar = () => {
  
  return (
    <div className="sidebar absolute z-50 sm:relative top-0 left-0 bg-gray-400 max-w-[300px] md:max-w-80 md:min-w-80 h-full w-full sm:w-80">
      <div className=" max-h-40">
        <Sidebarnav />
      </div>
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
