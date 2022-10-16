import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/userContext";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import DefaultPhoto from "../../images/defaultPhoto.jpg";
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 50px;
  padding: 10px;
  justify-content: space-between;
  color: #ddddf7;

  .logo {
    font-weight: bold;
  }
  .user {
    display: flex;
    gap: 10px;

    img {
      background-color: #ddddf7;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      object-fit: cover;
    }

    button {
      background-color: #5d5b8d;
      color: #ddddf7;
      font-size: 10px;
      border: none;
      cursor: pointer;
    }
  }
`;
const Navbar = () => {
  const { currentUser } = useContext(UserFirebaseContext);
  const { user } = useContext(UserContext);
  return (
    <Container>
      <span className="logo">UNIFRANZ</span>
      <div className="user">
        <img src={DefaultPhoto} alt="" />
        <span>{user.nombre}</span>
        {/*         <button>cerrar sesion</button> */}
      </div>
    </Container>
  );
};

export default Navbar;
