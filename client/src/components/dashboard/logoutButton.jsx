import React, {useContext} from "react";
import { useUserContext } from "../../context/userContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import { ChatContext } from "../../context/chatContext";
import { logOut } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { SideBarButton, SideBarIcon, SideBarOptionText } from "../../styles/pages/dashboard";
import { useVTNavigate } from "../../hooks/useVTNavigate";

const LogoutButton = () => {
  const { setUser } = useUserContext();
  const { setCurrentUser } = useContext(UserFirebaseContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useVTNavigate();

  const handleLogout = async () => {
    const resout = await logOut();
    const resoutJson = await resout?.json();
    if (resoutJson.message == "Successfully logged out") {
      //logged out postgres
      setUser({ isLogged: false });
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