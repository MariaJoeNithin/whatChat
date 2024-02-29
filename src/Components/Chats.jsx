import React from "react";

const Chats = () => {
  return (
    <>
      <div className="userChat border-b p-1 grid grid-cols-5 h-14 hover:bg-slate-500 transition-all duration-150 ">
        <div className=" col-span-1 flex h-full justify-center items-center">
          <img
            src="https://marketplace.canva.com/EAFOWUXOOvs/1/0/1600w/canva-green-gradient-minimalist-simple-instagram-profile-picture-tBlf3wVYGhg.jpg"
            alt=""
            className=" w-8 h-8 rounded-full  object-cover object-center"
          />
        </div>

        <div className="userChatInfo col-span-4 h-full flex flex-col justify-start text-left">
          <h1 className=" text-xl font-bold">Jane</h1>
          <p className="text-sm text-gray-600">Hello</p>
        </div>
      </div>
    </>
  );
};

export default Chats;
