import React from "react";
import Navbar from "./navbar";
import Chats from "./chats";
import { SidebarContainer } from "../../styles/pages/chat";

const Sidebar = ({ showSide, handleClick, email }) => {
 return (
    <SidebarContainer showSide={showSide}>
      <Navbar />
      <Chats email={email} handleClick={handleClick} />
    </SidebarContainer>
  );
};

export default Sidebar;