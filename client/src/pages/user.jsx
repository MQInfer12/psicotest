import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsers } from "../services/usuario";
import Cargando from "../components/cargando";
import UserCard from "../components/dashboard/userCard";
import UserModal from "../components/dashboard/userModal";

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
  const {user, setUser} = useContext(UserContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  
  const llenarUsuarios = async () => {
    const res = await getUsers();
    const resJson = await res?.json();
    setUsuarios(resJson);
    setLoadingUsers(false);
  }

  useEffect(() => {
    //PROTECCION DE RUTA SOLO PARA ADMINS
    if(user?.id_rol != 3) navigate("/dashboard");

    //LLENADO DE USUARIOS
    llenarUsuarios();
  }, []);

  return (
    <DivUsersPage>
      <ButtonCard onClick={() => setShowForm(true)}>Añadir</ButtonCard>
      {showForm && <UserModal
        cerrar={() => setShowForm(false)}
        actualizar={() => llenarUsuarios()}
      />}
      <DivUsersContainer>
        {
          loadingUsers? (
            <Cargando /> 
          ) : (
            usuarios?.map((u, i) => (
              <UserCard key={i} user={u} />
            ))
          )
        }
      </DivUsersContainer>
    </DivUsersPage>
  );
}

export default User;