import React from "react";
import conGif from "./158667-ezgif.com-gif-maker.gif";
import { useNavigate } from "react-router-dom";
import { RiHome5Fill } from "react-icons/ri";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={conGif} alt="" />
      <button
        className="text-xl text-blue-800 flex flex-row gap-2 text-center text-wrap items-center justify-center "
        onClick={() => navigate("/")}
      >
        Click To go back
        <RiHome5Fill />
      </button>
    </div>
  );
};

export default ErrorPage;
