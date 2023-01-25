import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ChatCom from "../components/chat/chatCom";
import Sidebar from "../components/chat/sidebar";
import { ChatContext } from "../context/chatContext";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { Home } from "../styles/pages/chat";

const Chat = ({ isInTestView = false, email_docente }) => {
  const windowHeight = useWindowHeight(true, true);
  const [showSide, setShowSide] = useState(isInTestView ? false : true);
  const { data } = useContext(ChatContext);
  const outletContext = useOutletContext();

  useEffect(() => {
    if(!isInTestView && outletContext) {
      const { makeVisibleY } = outletContext;
      return makeVisibleY();
    }
  }, []);

  return (
    <Home isInTestView={isInTestView} height={isInTestView ? "400px" : windowHeight}>
      <Sidebar
        email={data.email ? data.email : email_docente}
        showSide={showSide}
        handleClick={() => setShowSide(false)}
      />
      <ChatCom
        isInTestView={isInTestView}
        showSide={showSide}
        handleClick={() => setShowSide(!showSide)}
      />
    </Home>
  );
};

export default Chat;