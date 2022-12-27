import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useUserContext } from '../../../context/userContext';
import { useModal } from '../../../hooks/useModal';
import { deleteTest, updateTest } from '../../../services/test';
import { DangerIconButton, WhiteIconButton } from '../../../styles/globals/formularios';
import { CardButtonContainer } from '../../../styles/pages/test';
import code from '../../../utilities/code';
import SureModal from '../../globals/sureModal';
import ModalAssignBenef from '../modalAssignBenef';
import ModalAssignProfessor from '../modalAssignProfessor';
import ModalLink from '../modalLink';
import ModalTest from '../modalTest';
import ModalUnAssignBenef from '../modalUnassignBenef';
import ModalUnAssignProfessor from '../modalUnassignProfessor';

const CardButtons = ({ props }) => {
  const navigate = useNavigate();
  const { handleScrollTop } = useOutletContext();
  const { user } = useUserContext();
  const { id_rol: idRole } = user;
  const idCode = code(idRole === 2 ? props.id_test.toString() : props.id.toString());

  const handleTestCreator = () => {
    navigate(`./${idCode}`);
  }

  const handleTestView = () => {
    navigate(idRole === 1 ? `./testresolve/${idCode}` : `./testview/${idCode}`);
    handleScrollTop();
  };

  const borrarTest = async () => {
    const res = await deleteTest(props.id);
    const resJson = await res?.json();
    if (resJson) props.llenarTests();
  };

  /* MODALES NUEVOS CON REFACTOR, YA NO ESTÁN EN EL JSX DEL COMPONENTE */
  /* MODALES DE ADMINISTRADOR */
  const {openModal: openEdit, closeModal: closeEdit} = useModal(
    "Editar test",
    <ModalTest
      test={props}
      funcion="editar"
      call={updateTest}
      actualizar={() => {
        props.llenarTests();
        closeEdit();
      }}
    />
  );
  const {openModal: openAddDocente, closeModal: closeAddDocente} = useModal(
    "Editar test",
    <ModalAssignProfessor
      id={props.id}
      actualizar={() => {
        props.llenarTests();
        closeAddDocente();
      }}
    />
  );
  const {openModal: openDeleteDocente, closeModal: closeDeleteDocente} = useModal(
    "Editar test",
    <ModalUnAssignProfessor
      id={props.id}
      actualizar={() => {
        props.llenarTests();
        closeDeleteDocente();
      }}
    />
  );
  const {openModal: openDelete, closeModal: closeDelete} = useModal(
    "Editar test",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarTest}
      text={"Se eliminará el test '" + props.nombre + "' permanentemente"}
    />
  );

  /* MODALES DE DOCENTE */
  const {openModal: openAddBenef, closeModal: closeAddBenef} = useModal(
    "Asignar beneficiario",
    <ModalAssignBenef
      id={props.id}
      actualizar={() => {
        props.llenarTests();
        closeAddBenef();
      }}
    />
  )
  const {openModal: openDeleteBenef, closeModal: closeDeleteBenef} = useModal(
    "Asignar beneficiario",
    <ModalUnAssignBenef
      id={props.id}
      actualizar={() => {
        props.llenarTests();
        closeDeleteBenef();
      }}
    />
  )
  const {openModal: openLink} = useModal(
    "Compartir",
    <ModalLink id={props.id} nombreTest={props.nombre} />
  )

  return (
    <CardButtonContainer>
      <WhiteIconButton title="Ver test" onClick={handleTestView}>
        <i className="fa-solid fa-eye"></i>
      </WhiteIconButton>
      {
        idRole === 3 ?
        <>
          <WhiteIconButton title="Modificar test" onClick={handleTestCreator}>
            <i className="fa-solid fa-pen-to-square"></i>
          </WhiteIconButton>
          <WhiteIconButton title="Editar información del test" onClick={openEdit}>
            <i className="fa-solid fa-pencil"></i>
          </WhiteIconButton>
          <WhiteIconButton title="Asignar docente" onClick={openAddDocente}>
            <i className="fa-sharp fa-solid fa-user-plus"></i>
          </WhiteIconButton>
          <WhiteIconButton title="Desasignar docente" onClick={openDeleteDocente}>
            <i className="fa-solid fa-user-minus"></i>
          </WhiteIconButton>
          <DangerIconButton title="Eliminar test" onClick={openDelete}>
            <i className="fa-solid fa-trash-can"></i>
          </DangerIconButton>
        </> : 
        idRole === 2 &&
        <>
          <WhiteIconButton title="Asignar beneficiario" onClick={openAddBenef}>
            <i className="fa-sharp fa-solid fa-user-plus"></i>
          </WhiteIconButton>

          <WhiteIconButton title="Desasignar beneficiario" onClick={openDeleteBenef}>
            <i className="fa-solid fa-user-minus"></i>
          </WhiteIconButton>

          <WhiteIconButton title="Compartir" onClick={openLink}>
            <i className="fa-solid fa-share-nodes"></i>
          </WhiteIconButton>
        </>
      }
    </CardButtonContainer>
  )
}

export default CardButtons