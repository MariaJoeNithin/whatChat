import { createContext, useReducer, useState } from "react";
import { UserAuth } from "./Authcontext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = UserAuth();

  const [isOpen, setIsOpen] = useState(true);

  function togglePopup() {
    setIsOpen(!isOpen);
  }

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{ data: state, dispatch, isOpen, togglePopup }}
    >
      {children}
    </ChatContext.Provider>
  );
};
