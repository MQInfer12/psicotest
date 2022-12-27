import React, { useContext } from "react";
import More from "../../assets/msg/more.png";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../../context/chatContext";
import { ChatComContainer } from "../../styles/pages/chat";

const ChatCom = ({ showSide, handleClick, isInTestView }) => {
  const { data } = useContext(ChatContext);
  return (
    <ChatComContainer showSide={showSide}>
      <div className="chatInfo">
        <span>{data.user.email}</span>
        {!isInTestView && (
          <div className="chatIcons">
            <img src={More} onClick={handleClick} alt="" />
          </div>
        )}
      </div>
      <Messages />
      <Input />
    </ChatComContainer>
  );
};

export default ChatCom;