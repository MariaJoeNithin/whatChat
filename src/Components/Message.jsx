// import React, { useContext, useEffect, useRef } from "react";
// import { UserAuth } from "../authRelated/Authcontext";
// import { ChatContext } from "../authRelated/ChatContext";

// const Message = ({ message }) => {
//   const { currentUser } = UserAuth();
//   const { data } = useContext(ChatContext);

//   const ref = useRef();
//   const timestamp = message.date;

//   const milliseconds =
//     timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);

//   const date = new Date(milliseconds);

//   const formattedDate = date.toLocaleString();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message, currentUser]);

//   return (
//     <>
//       {message ? (
//         <div
//           className={` ${
//             message.senderId === currentUser?.uid
//               ? "justify-end"
//               : "justify-start"
//           } flex `}
//         >
//           <div
//             ref={ref}
//             className={`message ${
//               message.senderId === currentUser?.uid
//                 ? "justify-end"
//                 : "justify-start"
//             } flex flex-row my-2 gap-2 min-h-16 min-w-48 max-w-[500px] w-full`}
//           >
//             <div
//               className={`messageInfo  ${
//                 message.senderId === currentUser?.uid ? " order-2" : " order-1"
//               } flex flex-col h-full w-16 min-w-16 justify-start items-center`}
//             >
//               <img
//                 className=" w-8 min-w-8 h-8 rounded-full  object-cover object-center"
//                 src={
//                   message.senderId === currentUser?.uid
//                     ? currentUser?.photoURL
//                     : data?.user?.photoURL
//                 }
//                 alt=""
//               />
//               <span className="text-[10px] text-gray-500 text-center">
//                 {formattedDate}
//               </span>
//             </div>
//             <div
//               className={`userChatInfo ${
//                 message.senderId === currentUser?.uid
//                   ? " order-1 rounded-br-xl rounded-s-xl bg-gray-600 text-left"
//                   : " order-2 rounded-bl-xl rounded-e-xl bg-blue-500 text-start"
//               } h-auto flex flex-col w-full justify-start text-wrap   p-2 `}
//             >
//               <p className="text-sm text-white font-[500] w-full max-w-full break-words">
//                 {message?.text}
//               </p>
//               {message?.img && (
//                 <img
//                   className="h-auto rounded-lg shadow-sm"
//                   src={message?.img}
//                   alt=""
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Select User to Text</p>
//       )}
//     </>
//   );
// };

// export default Message;

import React, { useContext, useEffect, useRef } from "react";
import { UserAuth } from "../authRelated/Authcontext";
import { ChatContext } from "../authRelated/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = UserAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const timestamp = message.date;

  const milliseconds =
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);

  const date = new Date(milliseconds);

  const formattedDate = date.toLocaleString();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, currentUser]);

  console.log(message?.fileURL);

  return (
    <>
      {message ? (
        <div
          className={` ${
            message.senderId === currentUser?.uid
              ? "justify-end"
              : "justify-start"
          } flex `}
        >
          <div
            ref={ref}
            className={`message ${
              message.senderId === currentUser?.uid
                ? "justify-end"
                : "justify-start"
            } flex flex-row my-2 gap-2 min-h-16 min-w-48 max-w-[500px] w-full`}
          >
            <div
              className={`messageInfo  ${
                message.senderId === currentUser?.uid ? " order-2" : " order-1"
              } flex flex-col h-full w-16 min-w-16 justify-start items-center`}
            >
              <img
                className=" w-8 min-w-8 h-8 rounded-full  object-cover object-center"
                src={
                  message.senderId === currentUser?.uid
                    ? currentUser?.photoURL
                    : data?.user?.photoURL
                }
                alt=""
              />
              <span className="text-[10px] text-gray-500 text-center">
                {formattedDate}
              </span>
            </div>
            <div
              className={`userChatInfo ${
                message.senderId === currentUser?.uid
                  ? " order-1 rounded-br-xl rounded-s-xl bg-gray-600 text-left"
                  : " order-2 rounded-bl-xl rounded-e-xl bg-blue-500 text-start"
              } h-auto flex flex-col w-full justify-start text-wrap   p-2 `}
            >
              <p className="text-sm text-white font-[500] w-full max-w-full break-words">
                {message?.text}
              </p>
              {/* Displaying different content based on the message type */}
              {(message?.fileURL || message?.applicationURL) && (
                <a
                  href={message.fileURL}
                  className="text-blue-300 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* File Attachment */}
                  {message?.fileName ? `${message?.fileName}` : "File"}
                </a>
              )}
              {(message?.img || message?.imageURL) && (
                <img
                  className="h-auto rounded-lg shadow-sm"
                  src={message?.img ? message?.img : message?.imageURL}
                  alt={message?.img ? message?.img : message?.imageURL}
                />
              )}
              {message?.videoURL && (
                <video className="h-auto rounded-lg shadow-sm" controls>
                  <source src={message.videoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Select User to Text</p>
      )}
    </>
  );
};

export default Message;
