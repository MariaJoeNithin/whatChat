import React from "react";

const Message = () => {
  //   <div className="userChatInfo order-1 h-full flex flex-col w-full justify-start text-left bg-blue-400 p-2 rounded-bl-xl rounded-e-xl">
  //   <p className="text-sm text-white">Hello</p>
  // </div>

  return (
    <>
      <div className=" flex justify-end">
        <div className="flex flex-row my-2 gap-2 min-h-16 min-w-48 max-w-[500px] w-full justify-end">
          <div className=" order-2 flex flex-col h-full w-16 justify-start items-center">
            {/* <h1 className=" text-[10px] font-bold">Jane</h1> */}
            <img
              src="https://marketplace.canva.com/EAFOWUXOOvs/1/0/1600w/canva-green-gradient-minimalist-simple-instagram-profile-picture-tBlf3wVYGhg.jpg"
              alt=""
              className=" w-8 h-8 rounded-full  object-cover object-center"
            />
            <span className="text-[10px] text-gray-500">Just now</span>
          </div>
          <div className="userChatInfo order-1 h-full flex flex-col w-full justify-start text-left bg-gray-600 p-2 rounded-br-xl rounded-s-xl">
            <p className="text-sm text-white font-[500]">Hello</p>
            <img
              src="https://cdn.wallpapersafari.com/55/83/Pl6QHc.jpg"
              className="h-auto rounded-lg shadow-sm shadow-white"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
