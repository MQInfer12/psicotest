import React, { useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Search from "./search";
import Chats from "./chats";
import FutureChats from "./futureChats";

const Container = styled.div`
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  border-right: 1px solid #3d3c61;
  background-color: #3e3c61;
  overflow-x: hidden;
  z-index: 1;
  display: ${props => props.showSide ? "block" : "none"};

  @media (max-width: 1080px) {
    min-width: 100%;
    max-width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;

const Sidebar = ({ showSide, handleClick }) => {
  const [value, setValue] = useState(1);

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <Container showSide={showSide}>
      <Navbar handleChange={handleChange} />
      {/*<Search />*/}
      {value == 1 && <Chats handleClick={handleClick} />}
      {value == 2 && <FutureChats />}
      {/* <Chats /> */}
    </Container>
  );
};

export default Sidebar;
