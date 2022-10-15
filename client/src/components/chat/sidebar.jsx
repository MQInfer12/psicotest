import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Search from "./search";
import Chats from "./chats";
const Container = styled.div`
  flex: 1;
  border-right: 1px solid #3d3c61;
  background-color: #3e3c61;
`;

const Sidebar = () => {
  return (
    <Container>
      <Navbar />
      <Search />
      <Chats />
    </Container>
  );
};

export default Sidebar;
