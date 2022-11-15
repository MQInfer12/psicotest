import React from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import ModalTest from "./modalTest";
import { deleteTest, updateTest } from "../../services/test";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton, DangerIconButton } from "../../styles/globals/formularios";
import ModalAssignProfessor from "./modalAssignProfessor";
import ModalUnassign from "./modalUnassignProfessor";
import SureModal from "../globals/sureModal";
import { useOutletContext } from "react-router-dom";
import codeId from "../../utilities/code";
import { useModal } from "../../hooks/useModal";

const TestCard = (props) => {
  const navigate = useNavigate();
  const { handleScrollTop } = useOutletContext();

  const borrarTest = async () => {
    const res = await deleteTest(props.id);
    const resJson = await res?.json();
    if (resJson) props.llenarTests();
  };

  const handleClick = () => {
    let stringInd = props.id.toString();
    let idCode = codeId(stringInd);
    navigate(`./${idCode}`);
  };

  const handleTextView = () => {
    let stringInd = props.id.toString();
    let idCode = codeId(stringInd);
    navigate(`./testview/${idCode}`);
    handleScrollTop();
  };

  /* MODALES NUEVOS CON REFACTOR, YA NO ESTÁN EN EL JSX DEL COMPONENTE */
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
    <ModalUnassign
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

  return (
    <Container>
      <H2>{props.nombre}</H2>
      <P>{props.descripcion}</P>

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-user"></i>
        </div>
        <Span>{props.autor}</Span>
      </ContainerIcon>

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-clock"></i>
        </div>
        <Span>{props.tiempo}</Span>
      </ContainerIcon>

      <ContainerImg>
        {props.usuarios.length == 0 && (
          <Span>¡Asigna docentes a este Test!</Span>
        )}
        {props.usuarios.map((v, i) => (
          <div key={i}>
            <ProfilePic
              width="36px"
              height="36px"
              border={true}
              translation={i}
              id={v.id}
              perfil={v.perfil}
            />
          </div>
        ))}
      </ContainerImg>

      <ButtonContainer>
        <WhiteIconButton title="Ver test" onClick={handleTextView}>
          <i className="fa-solid fa-newspaper"></i>
        </WhiteIconButton>
        <WhiteIconButton title="Modificar test" onClick={handleClick}>
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
      </ButtonContainer>
    </Container>
  );
};

export default TestCard;

const Container = styled.div`
  width: 322px;
  background-color: #fff;
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid #670ce3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H2 = styled.h2`
  height: 60px;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const P = styled.p`
  height: 72px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Span = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 3px;
`;

const ContainerIcon = styled.div`
  color: #d9d9d9;
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    width: 25px;
    text-align: center;
  }
`;

const ContainerImg = styled.div`
  height: 43px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
