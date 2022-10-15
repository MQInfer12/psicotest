import React from "react";
import styled from "styled-components";
import ChatCom from "../components/chat/chat";
import Sidebar from "../components/chat/sidebar";

const Home = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    border: 1px solid white;
    border-radius: 10px;
    width: 65%;
    height: 80%;
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
