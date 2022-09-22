import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsers, searchUsers } from "../services/usuario";
import Cargando from "../components/globals/cargando";
import UserCard from "../components/user/userCard";
import UserModal from "../components/user/userModal";
import UserSearch from "../components/user/userSearch";

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
    console.log(resJson)
  };

  useEffect(() => {
    //PROTECCION DE RUTA SOLO PARA ADMINS
    if (user?.id_rol != 3) navigate("/dashboard");

    //LLENADO DE USUARIOS
    llenarUsuarios();
  }, []);

  const [filter, setFilter] = useState("");
  const [optionFilter, setOptionFilter] = useState("email");
  const handleChange = () => {
    llenarUsuarios();
  };

  return (
    <DivUsersPage>

      {/* FILTRAR */}
      <div>
        <input
          type="text"
          placeholder="Enter Post gmail"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />

        <select
          name="optionFilter"
          onChange={(e) => setOptionFilter(e.target.value)}
        >
          <option value={"email"}>correo</option>
          <option value={"nombre"}>nombre</option>
          <option value={"rol"}>roles</option>
        </select>
      </div>



      <ButtonCard onClick={() => setShowForm(true)}>Añadir</ButtonCard>
      {showForm && (
        <UserModal
          cerrar={() => setShowForm(false)}
          actualizar={() => llenarUsuarios()}
          funcion="añadir"
        />
      )}
      <DivUsersContainer>
        {loadingUsers ? (
          <Cargando />
        ) : (
          usuarios
            .filter((v) => {
              if (filter === "") {
                return v;
              } 
              if(optionFilter==="email"){
                if (v.email.toLowerCase().includes(filter.toLowerCase())) {
                  return v;
                }
              }
              if(optionFilter==="nombre"){
                if (v.nombre.toLowerCase().includes(filter.toLowerCase())) {
                  return v;
                }
              }
              if(optionFilter==="rol"){
                if (v.rol.toLowerCase().includes(filter.toLowerCase())) {
                  return v;
                }
              }
            })
            .map((v, i) => {
              return (
                <div key={i}>
                  <UserCard {...v} onSubmit={handleChange} />
                </div>
              );
            })
        )}
      </DivUsersContainer>
    </DivUsersPage>
  );
};

export default User;
