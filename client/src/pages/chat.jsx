import React from "react";
import styled from "styled-components";
import ChatCom from "../components/chat/chat";
import Sidebar from "../components/chat/sidebar";

const Home = styled.div`
  height: 100%;
  .container {
    border: 1px solid white;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
`;

const Chat = () => {
  return (
    <Home>
      <div className="container">
        <Sidebar />
        <ChatCom />
      </div>
    </Home>
  );
};

export default Chat;
