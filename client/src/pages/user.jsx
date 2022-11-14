import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WhiteButton } from "../styles/globals/formularios";
import { addUser, getUsers } from "../services/usuario";
import Cargando from "../components/globals/cargando";
import UserResponse from "../components/user/filter/userReponse";
import UserFilter from "../components/user/filter/userFilter";
import Modal from "../components/globals/modal";
import ModalUser from "../components/user/modalUser";
import { useWindowHeight } from "../hooks/useWindowHeight";

const User = () => {
  const windowHeight = useWindowHeight(true, true);
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const llenarUsuarios = async () => {
    const res = await getUsers();
    const resJson = await res?.json();
    setUsuarios(resJson);
    setLoadingUsers(false);
  };

  useEffect(() => {
    //LLENADO DE USUARIOS
    llenarUsuarios();
  }, []);

  /* ====== FILTER ====== */

  const [filter, setFilter] = useState("");
  const [optionFilter, setOptionFilter] = useState("email");
  
  const handleChange = () => {
    llenarUsuarios();
  };

  const handleSaveInput = (value) => {
    setFilter(value);
  };

  const handleOptionSelect = (option) => {
    setOptionFilter(option);
  };

  return (
    <DivUsersPage height={windowHeight}>
      {
        loadingUsers ? (
          <CargandoContainer height={windowHeight}>
            <Cargando />
          </CargandoContainer>
        ) : (
          <>
            <DivControls>
            <UserFilter
              handleSaveInput={handleSaveInput}
              handleOptionSelect={handleOptionSelect}
            />
            <WhiteButton onClick={() => setShowForm(true)}>Añadir</WhiteButton>
            </DivControls>
            {showForm && 
            <Modal cerrar={() => setShowForm(false)} titulo="Añadir usuario">
              <ModalUser
                call={addUser}
                actualizar={() =>{
                  llenarUsuarios();
                  setShowForm(false);
                }}
                funcion="añadir"
              />
            </Modal>
            }
            <DivUsersContainer>
            <UserResponse
              usuarios={usuarios}
              filter={filter}
              optionFilter={optionFilter}
              handleChange={handleChange}
            />
            </DivUsersContainer>
          </>
        )
      }
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

const CargandoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height};
`;

const DivUsersContainer = styled.div`
  border-radius: 20px;
  padding: 30px 0px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DivControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;