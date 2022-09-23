import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsers, searchUsers } from "../services/usuario";
import Cargando from "../components/globals/cargando";
import UserModal from "../components/user/userModal";
import UserResponse from "../components/user/filter/userReponse";
import UserFilter from "../components/user/filter/userFilter";

const DivUsersPage = styled.div`
  min-height: 90vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const DivUsersContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  padding: 40px;
  background-color: #f4bbff;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ButtonCard = styled.button`
  width: 200px;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const User = () => {
  const { user, setUser } = useContext(UserContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const llenarUsuarios = async () => {
    const res = await getUsers();
    const resJson = await res?.json();
    setUsuarios(resJson);
    setLoadingUsers(false);
  };

  useEffect(() => {
    //PROTECCION DE RUTA SOLO PARA ADMINS
    if (user?.id_rol != 3) navigate("/dashboard");

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
    <DivUsersPage>

      {/* FILTRAR */}
      
      <UserFilter
        handleSaveInput={handleSaveInput}
        handleOptionSelect={handleOptionSelect}
      />

      <ButtonCard onClick={() => setShowForm(true)}>Añadir</ButtonCard>
      {showForm && (
        <UserModal
          cerrar={() => setShowForm(false)}
          actualizar={() => llenarUsuarios()}
          funcion="añadir"
        />
      )}

      {/* ==== LISTADO ===== */}
      <DivUsersContainer>
        {loadingUsers ? (
          <Cargando />
        ) : (
          <UserResponse
            usuarios={usuarios}
            filter={filter}
            optionFilter={optionFilter}
            handleChange={handleChange}
          />
        )}
      </DivUsersContainer>
    </DivUsersPage>
  );
};

export default User;
