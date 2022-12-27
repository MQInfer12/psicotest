import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/userContext';
import { addGrupo, getGruposDocente } from '../services/grupo';
import ModalGroup from '../components/group/modalGroup';
import GroupResponse from '../components/group/groupResponse';
import Cargando from '../components/globals/cargando';
import { useModal } from '../hooks/useModal';
import { ButtonAdd, DivGroups, DivGroupsPage } from '../styles/pages/group';

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