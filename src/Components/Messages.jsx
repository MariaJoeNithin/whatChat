import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../authRelated/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/FireBase";
import { UserAuth } from "../authRelated/Authcontext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = UserAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      if (data && data.chatId) {
        try {
          const chatDocRef = doc(db, "chats", data.chatId);
          const unsubscribe = onSnapshot(chatDocRef, (doc) => {
            if (doc.exists()) {
              setMessages(doc.data().messages);
            } else {
              console.log("No such document!");
              setMessages([]);
            }
          });
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [data?.chatId, currentUser]);

  return (
    <div>
      {data?.chatId === "null" ? (
        <p className="text-lg font-bold text-center m-5">
          Select A User To Chat
        </p>
      ) : (
        <>
          {messages.map((m) => (
            <Message message={m} key={m.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
