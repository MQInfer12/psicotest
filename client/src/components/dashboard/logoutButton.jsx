import React, {useContext} from "react";
import { UserContext } from "../../context/userContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { ChatContext } from "../../context/chatContext";
import styled from "styled-components";
import { logOut } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const SideBarIcon = styled.i`
  text-align: center;
  font-size: 16px;
  width: 30px;
`;

const SideBarOptionText = styled.span`
  font-size: 16px;
  line-height: 27px;
`;

const SideBarButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  color: #d9d9d9;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px 20px 10px 20px;
  border-radius: 8px;
  transition: all 0.4s;

  &:hover {
    color: #660be1;
  }
`;

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserFirebaseContext);
  const { dispatch } = useContext(ChatContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const resout = await logOut();
    const resoutJson = await resout?.json();
    if (resoutJson.message == "Successfully logged out") {
      //logged out postgres
      setUser(undefined);
      //setFirebaseUser to {}
      setCurrentUser({});
      //resetChatContext
      dispatch({type: "RESET_USER"});
      //redirect login
      navigate("/login");
    }
  };

  return (
    <li>
      <SideBarButton onClick={handleLogout}>
        <SideBarIcon className="fa-solid fa-right-from-bracket"></SideBarIcon>
        <SideBarOptionText>Logout</SideBarOptionText>
      </SideBarButton>
    </li>
  );
};

export default LogoutButton;
