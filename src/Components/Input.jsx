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
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(""); // State to store temporary URL of selected file
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      if (file) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, file);
        const fileType = file.type.split("/")[0]; // Extracting the file type (image, video, etc.)

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
          },
          (error) => {
            console.error(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser?.uid,
                  date: Timestamp.now(),
                  [`${fileType}URL`]: downloadURL,
                  fileName: file.name,
                }),
              });
            } catch (error) {
              console.error(error);
            } finally {
              setUploadProgress(0);
            }
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

      const commonUpdate = {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      };

      await Promise.all([
        updateDoc(doc(db, "userChats", currentUser.uid), commonUpdate),
        updateDoc(doc(db, "userChats", data.user.uid), commonUpdate),
      ]);

      setText("");
      setFile(null);
      setFileURL(""); // Clear file URL after sending
    } catch (error) {
      console.error(error);
    }
  };


  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileURL(URL.createObjectURL(selectedFile));
    } // Create URL for the selected file
  };

  return (
    <div className="input flex flex-row bg-gray-300 p-2 items-center relative">
      <input
        className="w-[100%] bg-transparent h-full col-span-8 outline-none px-3 text-gray-700 rounded-full border p-2 shadow-lg"
        type="text"
        onKeyDown={handleKey}
        placeholder="Message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send flex gap-2 mx-3 justify-center items-center">
        <label htmlFor="file" className="text-gray-600 cursor-pointer">
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={handleFileChange}
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

      {fileURL && (
        <div className="file-preview absolute bottom-20 left-5 bg-blue-200 rounded-lg text-white flex items-center p-3 h-36">
          <img
            src={fileURL}
            alt="Selected file"
            className="h-full mr-2 shadow-lg rounded-lg"
          />
          <span>{file.name}</span>
        </div>
      )}

      {uploadProgress > 0 && (
        <div className="upload-progress absolute -top-10 right-10 bg-white flex rounded-full p-3">
          Upload Progress:
          <div className="w-28 bg-black p-1 border h-3 rounded-full flex">
            <div
              className={`w-[${uploadProgress}%] transition-all h-full bg-white`}
            ></div>
          </div>
          {uploadProgress}%
        </div>
      )}
    </div>
  );
};

export default Input;
