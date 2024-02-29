import React, { useState } from "react";
import { db } from "../config/FireBase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Search = () => {
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

  return (
    <>
      <div className="search">
        <div className="searchForm m-1 p-1">
          <input
            type="text"
            placeholder="search user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border w-full rounded-lg p-2 outline-none"
          />
        </div>
        {err && <span>User Not Found</span>}
        {thisUser && (
          <div className="userChat border-b p-1 grid grid-cols-5 h-14 hover:bg-slate-500 transition-all duration-150 ">
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
