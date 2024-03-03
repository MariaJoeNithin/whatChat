import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/FireBase";
import { UserAuth } from "../authRelated/Authcontext";
import { ChatContext } from "../authRelated/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);

  const { currentUser } = UserAuth();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => unsub();
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  // console.log(Object.entries(chats));

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat, index) => (
          <div
            key={index}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="userChat border-b cursor-pointer p-1 grid grid-cols-5 h-14 hover:bg-slate-500 transition-all duration-150 "
          >
            <div className=" col-span-1 flex h-full justify-center items-center">
              <img
                src={chat[1]?.userInfo?.photoURL}
                alt=""
                className=" w-8 h-8 rounded-full  object-cover object-center"
              />
            </div>

            <div className="userChatInfo col-span-4 h-full flex flex-col justify-center text-left">
              <h1 className=" text-xl font-bold">
                {chat[1]?.userInfo?.displayName}
              </h1>
              {chat[1]?.lastMessage?.text ? (
                <p className="text-sm text-gray-600">
                  {chat[1]?.lastMessage?.text.length > 40
                    ? chat[1]?.lastMessage?.text.substring(0, 40) + "..."
                    : chat[1]?.lastMessage?.text}
                </p>
              ) : (
                "doc"
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default Chats;
