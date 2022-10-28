import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ChatCom from "../components/chat/chat";
import Sidebar from "../components/chat/sidebar";

const Home = styled.div`
  height: calc(100vh - 197px);
  .container {
    z-index: 1;
    border: 1px solid white;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const Chat = () => {
  let siderRef = useRef(null);

  useEffect(() => {
    const el1 = siderRef.current;
  }, []);

  const handleClick = () => {
    /*siderRef.current.style.display = "none";
    console.log(siderRef.current);*/
    if (siderRef.current.style.display == "block") {
      siderRef.current.style.display = "none";
    } else {
      siderRef.current.style.display = "block";
    }
  };
  return (
    <Home>
      <div className="container">
        <Sidebar siderRef={siderRef}  />
        <ChatCom handleClick={handleClick} />
      </div>
    </Home>
  );
};

export default Chat;
