import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Search from "./search";
import Chats from "./chats";
import FutureChats from "./futureChats";
const Container = styled.div`
  flex: 1;
  border-right: 1px solid #3d3c61;
  background-color: #3e3c61;
  overflow-y: scroll;
`;

const Sidebar = () => {
  const [value, setValue] = useState(1);
  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <Container>
      <Navbar handleChange={handleChange} />
      {/*<Search />*/}
      {value == 1 && <Chats />}
      {value == 2 && <FutureChats />}  
      {/* <Chats /> */}
    </Container>
  );
};

export default Sidebar;
