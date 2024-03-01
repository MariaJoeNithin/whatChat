import React, { useContext, useState } from "react";
import { db } from "../config/FireBase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserAuth } from "../authRelated/Authcontext";
import { ChatContext } from "../authRelated/ChatContext";

const Search = () => {
  const { currentUser } = UserAuth();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { dispatch } = useContext(ChatContext);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    setErr(false); // Reset error state
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc?.data());
      });
      if (querySnapshot.empty) {
        setErr(true);
      }
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await Promise.all([
          await updateDoc(doc(db, "userChats", currentUser?.uid), {
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }),
          await updateDoc(doc(db, "userChats", user?.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser?.uid,
              displayName: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }),
        ]);
      }
      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (error) {
      console.error(error);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <>
      <div className="search">
        <div className="searchForm m-1 p-1">
          <input
            type="text"
            placeholder="search user"
            onKeyDown={handleKey}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border w-full rounded-lg p-2 outline-none"
          />
        </div>
        {err && <span>User Not Found</span>}
        {user && (
          <div
            className="userChat border-b p-1 grid grid-cols-5 h-14 hover:bg-slate-500 transition-all duration-150 "
            onClick={handleSelect}
          >
            <div className=" col-span-1 flex h-full justify-center items-center">
              <img
                src={
                  user.photoURL ||
                  "https://static-00.iconduck.com/assets.00/user-square-icon-2048x2048-xap5edxp.png"
                }
                alt=""
                className=" border h-8 w-8 rounded-full  object-cover object-center"
              />
            </div>

            <div className="userChatInfo col-span-4 h-full flex flex-col justify-start text-left">
              <h1 className=" text-xl font-bold">{user?.displayName}</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
