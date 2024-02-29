import React from "react";
import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";

const Home = () => {
  return (
    <div className="home">
      <div className="content flex w-full border border-black h-[100vh] items-center p-0 md:p-5">
        <div className="relative flex w-full h-[80vh] rounded-xl overflow-hidden shadow-2xl border border-gray-300">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
