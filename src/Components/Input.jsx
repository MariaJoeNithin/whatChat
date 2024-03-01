import React, { useContext, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { UserAuth } from "../authRelated/Authcontext";
import { ChatContext } from "../authRelated/ChatContext";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/FireBase";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Input = () => {
  const { currentUser } = UserAuth();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input flex flex-row bg-gray-300 p-2 items-center">
      <input
        className="w-[100%] bg-transparent h-full col-span-8 outline-none px-3 text-gray-700"
        type="text"
        placeholder="Message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send flex gap-2 mx-3 justify-center items-center">
        <label htmlFor="file" className=" text-gray-600 cursor-pointer">
          <input
            type="file"
            className=" hidden"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <IoMdAttach className="text-3xl" />
        </label>
        <button
          className="bg-blue-800 hover:bg-blue-600 rounded-full h-8 w-8 min-w-8 flex justify-center items-center text-white"
          onClick={handleSend}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
