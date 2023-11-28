import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useUserContext } from '../../../context/userContext';
import { useModal } from '../../../hooks/useModal';
import { deleteTest, updateTest } from '../../../services/test';
import { DangerIconButton, WhiteIconButton } from '../../../styles/globals/formularios';
import { CardButtonContainer, Dots } from '../../../styles/pages/test';
import code from '../../../utilities/code';
import SureModal from '../../globals/sureModal';
import ModalAssignBenef from '../modalAssignBenef';
import ModalLink from '../modalLink';
import ModalTest from '../modalTest';

const CardButtons = ({ props }) => {
  const navigate = useNavigate();
  const { handleScrollTop } = useOutletContext();
  const { user } = useUserContext();
  const { id_rol: idRole } = user;
  const idCode = code(idRole === 1 ? props.id.toString() : props.id_test.toString());
  const [showMore, setShowMore] = useState(false);

  const handleTestCreator = () => {
    navigate(`./${idCode}`);
  }

  const handleTestView = () => {
    navigate(idRole === 1 ? `./testresolve/${idCode}` : `./testview/${idCode}`);
    handleScrollTop();
  };

  const borrarTest = async () => {
    const res = await deleteTest(props.id_test);
    const resJson = await res?.json();
    if (resJson) props.llenarTests();
  };

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
  );

  const {openModal: openLink} = useModal(
    "Compartir",
    <ModalLink 
      route="/share/" 
      id={props.id} 
      nombreTest={props.nombre}
      destinatarios="beneficiarios" 
    />
  );

  const {openModal: openMiniLink} = useModal(
    "Añadir colaboradores",
    <ModalLink 
      route="/collab/" 
      id={props.id_test} 
      nombreTest={props.nombre} 
      destinatarios="colaboradores" 
    />
  );

  return (
    <>
    <Dots className={showMore ? " active" : ""} onClick={() => setShowMore(!showMore)}>
      <i 
        className="fa-solid fa-ellipsis"
      ></i>
    </Dots>
    <CardButtonContainer>
      <div>
        <WhiteIconButton title="Ver test" onClick={handleTestView}>
          <i className="fa-solid fa-eye"></i>
        </WhiteIconButton>
        {
          idRole != 1 &&
          <>
          {
            user.id === props.id_autor &&
            <>
            <WhiteIconButton title="Modificar test" onClick={handleTestCreator}>
              <i className="fa-solid fa-pen-to-square"></i>
            </WhiteIconButton>
            </>
          }
          </>
        }
        {
          idRole >= 2 &&
          <>
          <WhiteIconButton title="Compartir enlace a beneficiarios" onClick={openLink}>
            <i className="fa-solid fa-share-nodes"></i>
          </WhiteIconButton>
          </>
        }
      </div>
      {
        showMore &&
        <div>
          {
            (idRole != 1 && user.id === props.id_autor) &&
            <>
            <WhiteIconButton title="Editar información del test" onClick={openEdit}>
              <i className="fa-solid fa-pencil"></i>
            </WhiteIconButton>
            <WhiteIconButton title="Añadir colaboradores" onClick={openMiniLink}>
              <i className="fa-solid fa-users-gear"></i>
            </WhiteIconButton>
            </>
          }
          {
            idRole >= 2 &&
            <>
            <WhiteIconButton title="Asignar beneficiarios manualmente" onClick={openAddBenef}>
              <i className="fa-solid fa-user-group"></i>
            </WhiteIconButton>
            </>
          }
          {
            (idRole != 1 && user.id === props.id_autor) &&
            <>
            <DangerIconButton title="Eliminar test" onClick={openDelete}>
              <i className="fa-solid fa-trash-can"></i>
            </DangerIconButton>
            </>
          }
        </div>
      }
    </CardButtonContainer>
    </>
  )
}

export default CardButtons