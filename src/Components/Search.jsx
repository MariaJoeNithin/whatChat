import React, { useState } from "react";
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

const Search = () => {
  const { user } = UserAuth();
  const [username, setUsername] = useState(null);
  const [thisUser, setThisUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setThisUser(doc?.data());
      });
    } catch (error) {
      setErr(true);
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setThisUser(doc?.data());
    });
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      user.uid > thisUser.uid
        ? user.uid + thisUser.uid
        : thisUser.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chat
        await updateDoc(doc(db, "userChats", thisUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: thisUser.uid,
            displayName: thisUser.displayName,
            photoURL: thisUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // create otherUser chat
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(error);
    }
    setThisUser(null);
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
        {thisUser && (
          <div
            className="userChat border-b p-1 grid grid-cols-5 h-14 hover:bg-slate-500 transition-all duration-150 "
            onClick={handleSelect}
          >
            <div className=" col-span-1 flex h-full justify-center items-center">
              <img
                src={thisUser?.profileURL}
                alt=""
                className=" w-8 h-8 rounded-full  object-cover object-center"
              />
            </div>

            <div className="userChatInfo col-span-4 h-full flex flex-col justify-start text-left">
              <h1 className=" text-xl font-bold">{thisUser.displayName}</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
