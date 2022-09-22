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
  };

  useEffect(() => {
    //PROTECCION DE RUTA SOLO PARA ADMINS
    if (user?.id_rol != 3) navigate("/dashboard");

    //LLENADO DE USUARIOS
    llenarUsuarios();
  }, []);

  const [filter, setFilter] = useState("");
  const handleChange = () => {
    llenarUsuarios()
  };
  return (
    <DivUsersPage>
      <div>
        <input
          type="text"
          placeholder="Enter Post gmail"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
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
              } else if (v.email.toLowerCase().includes(filter.toLowerCase())) {
                return v;
              }
            })
            .map((v, i) => {
              return <UserCard {...v} onSubmit={handleChange} />;
            })
        )}
      </DivUsersContainer>
    </DivUsersPage>
  );
};

export default User;
