import React from "react";
import { useUserContext } from "../../context/userContext";
import { NavbarContainer } from "../../styles/pages/chat";
import ProfilePic from "../globals/profilePic";

const Navbar = () => {
  const { user } = useUserContext();

  return (
    <NavbarContainer>
      <span className="logo">UNIFRANZ</span>
      <div className="user">
        <ProfilePic
          width="24px"
          height="24px"
          perfil={user.perfil}
        />
      </div>
    </NavbarContainer>
  );
};

export default Navbar;