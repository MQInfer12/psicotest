import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import styled from 'styled-components';
import { addGrupo, getGruposDocente } from '../services/grupo';
import ModalGroup from '../components/group/modalGroup';
import GroupResponse from '../components/group/groupResponse';
import Cargando from '../components/globals/cargando';
import { useModal } from '../hooks/useModal';

const Group = () => {
  const { user } = useUserContext();
  const [ grupos, setGrupos ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const llenarGrupos = async () => {
    const res = await getGruposDocente(user.id);
    const resJson = await res?.json();
    setGrupos(resJson);
    setLoading(false);
  }

  useEffect(() => {
    //LLENAR GRUPOS
    llenarGrupos();
  }, []);

  const { openModal, closeModal } = useModal(
    "Añadir grupo",
    <ModalGroup 
      call={addGrupo}
      actualizar={() => {
        llenarGrupos();
        closeModal();
      }}
      id_docente={user.id}
      funcion="añadir"
    />
  )

  return (
    <DivGroupsPage>
      <ButtonAdd onClick={openModal}>Añadir grupo</ButtonAdd>
      <DivGroups>
        { loading? (
          <Cargando />
        ) : (
          <GroupResponse grupos={grupos} llenarGrupos={llenarGrupos} />
        )}
      </DivGroups>
    </DivGroupsPage>
  )
}

export default Group;

const DivGroupsPage = styled.div`
  width: 100%;
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

const DivGroups = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
`;