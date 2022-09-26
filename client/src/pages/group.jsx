import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import styled from 'styled-components';
import { getGruposDocente } from '../services/grupo';
import Modal from '../components/globals/modal';
import ModalGroup from '../components/group/modalGroup';
import GroupResponse from '../components/group/groupResponse';

const DivUsersPage = styled.div`
  min-height: 90vh;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonAdd = styled.button`
  width: 200px;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Group = () => {
  const { user, setUser } = useContext(UserContext);
  const [ grupos, setGrupos ] = useState([]);
  const [ showForm, setShowForm ] = useState(false);
  const navigate = useNavigate();

  const llenarGrupos = async () => {
    const res = await getGruposDocente(user.id);
    const resJson = await res?.json();
    setGrupos(resJson);
  }

  useEffect(() => {
    //PROTECCION DE RUTA SOLO PARA DOCENTES
    if (user?.id_rol != 2) return navigate("/dashboard");

    //LLENAR GRUPOS
    llenarGrupos();
  }, []);

  return (
    <DivUsersPage>
      <ButtonAdd onClick={() => setShowForm(true)}>Añadir grupo</ButtonAdd>

      {showForm && 
        <Modal cerrar={() => setShowForm(false)} >
          <ModalGroup 
            actualizar={() => {
              llenarGrupos();
              setShowForm(false);
            }}
            id_docente={user.id}
            funcion="añadir"
          />
        </Modal>
      }

      <GroupResponse grupos={grupos} llenarGrupos={llenarGrupos} />
    </DivUsersPage>
  )
}

export default Group;