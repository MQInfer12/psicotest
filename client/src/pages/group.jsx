import React from 'react';
import { useUserContext } from '../context/userContext';
import { addGrupo } from '../services/grupo';
import ModalGroup from '../components/group/modalGroup';
import GroupResponse from '../components/group/groupResponse';
import Cargando from '../components/globals/cargando';
import { useModal } from '../hooks/useModal';
import { ButtonAdd, DivGroups, DivGroupsPage } from '../styles/pages/group';
import useGet from '../hooks/useGet';

const Group = () => {
  const { user } = useUserContext();

  const { callAPI: llenarGrupos, resJson: grupos, loading } = useGet(`grupo/docente/${user.id}`);

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