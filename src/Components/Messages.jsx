import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../authRelated/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/FireBase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

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
              setMessages([]); // Set messages to an empty array if the document doesn't exist
            }
          });
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [data?.chatId]);

  return (
    <div>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
