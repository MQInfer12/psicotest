import React, { useState } from "react";
import styled from "styled-components";
import { WhiteButton } from "../styles/globals/formularios";
import { addUser, getUsers } from "../services/usuario";
import Cargando from "../components/globals/cargando";
import UserResponse from "../components/user/filter/userReponse";
import UserFilter from "../components/user/filter/userFilter";
import ModalUser from "../components/user/modalUser";
import { useWindowHeight } from "../hooks/useWindowHeight";
import useAPI from "../hooks/useAPI";
import { useModal } from "../hooks/useModal";

const User = () => {
  const windowHeight = useWindowHeight(true, true);
  const { callAPI, resJson: usuarios, loading } = useAPI(getUsers);
  const {openModal, closeModal} = useModal(
    "Añadir usuario", 
    <ModalUser
      call={addUser}
      actualizar={() =>{
        callAPI();
        closeModal();
      }}
      funcion="añadir"
    />
  );

  /* ====== FILTER ====== */

  const [filter, setFilter] = useState("");
  const [optionFilter, setOptionFilter] = useState("email");

  if(loading) return (<Cargando container windowHeight={windowHeight} />);

  return (
    <DivUsersPage height={windowHeight}>
      <DivControls>
        <UserFilter
          setFilter={setFilter}
          setOptionFilter={setOptionFilter}
        />
        <WhiteButton onClick={openModal}>Añadir</WhiteButton>
      </DivControls>
      <UserResponse
        usuarios={usuarios}
        filter={filter}
        optionFilter={optionFilter}
        handleChange={callAPI}
      />
    </DivUsersPage>
  );
};

export default User;

const DivUsersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${props => props.height};
`;

const DivControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;