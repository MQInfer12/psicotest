import React, { useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Search from "./search";
import Chats from "./chats";
import FutureChats from "./futureChats";
const Container = styled.div`
  min-width: 33%;
  border-right: 1px solid #3d3c61;
  background-color: #3e3c61;
  overflow-x: hidden;
  z-index: 1;
  
  @media (max-width: 1214px) {
    min-width: 40%;
  }
  @media (max-width: 1060px) {
    min-width: 100%;
    max-width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;

const Sidebar = ({ siderRef, handleClick }) => {
  const [value, setValue] = useState(1);

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <Container ref={siderRef}>
      <Navbar handleChange={handleChange} />
      {/*<Search />*/}
      {value == 1 && <Chats />}
      {value == 2 && <FutureChats />}
      {/* <Chats /> */}
    </Container>
  );
};

export default Sidebar;
