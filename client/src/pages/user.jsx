import React, { useState } from "react";
import { WhiteButton } from "../styles/globals/formularios";
import { addUser } from "../services/usuario";
import Cargando from "../components/globals/cargando";
import UserResponse from "../components/user/filter/userReponse";
import UserFilter from "../components/user/filter/userFilter";
import ModalUser from "../components/user/modalUser";
import { useWindowHeight } from "../hooks/useWindowHeight";
import useGet from "../hooks/useGet";
import { useModal } from "../hooks/useModal";
import { DivControls, DivUsersPage } from "../styles/pages/user";

const User = () => {
  const windowHeight = useWindowHeight(true, true);
  const { callAPI, resJson: usuarios, loading } = useGet("user");

  /* ====== FILTER ====== */

  const [filter, setFilter] = useState("");
  const [optionFilter, setOptionFilter] = useState("email");

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