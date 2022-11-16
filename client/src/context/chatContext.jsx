import { createContext, useContext, useReducer } from "react";
import { UserFirebaseContext } from "./userFirebaseContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const { currentUser } = useContext(UserFirebaseContext);

  const INITIAL_STATE = {
    chatId: null,
    user: {},
    email: '',
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          email: action.payload.email,
          user: action.payload,
          chatId:
            Number(currentUser?.uid) > Number(action.payload.uid)
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        };
      case "RESET_USER":
        return INITIAL_STATE;
      case "SET_USER":
        return {
          email: action.payload.email,
          user: {},
          chatId: null,
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
