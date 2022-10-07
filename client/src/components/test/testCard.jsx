import React, { useState } from "react";
import styled from "styled-components";
import Timer from "../../icons/timer";
import People from "../../icons/people";
import ProfilePic from "../globals/profilePic";
import Modal from "../globals/modal";
import ModalTest from "./modalTest";
import { deleteTest } from "../../services/test";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton, PurpleIconButton, DangerIconButton } from "../../styles/formularios";

const Container = styled.div`
  width: 322px;
  height: fit-content;
  background-color: #fff;
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid #670ce3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: #000000;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  opacity: 0.6;
`;

const Span = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 3px;
`;

const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  gap: -16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TestCard = (props) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const borrarTest = async () => {
    const res = await deleteTest(props.id);
    const resJson = await res?.json();
    if(resJson) props.llenarTests();
  }

  return (
    <Container>
      <H2>{props.nombre}</H2>
      <P>
        {props.descripcion}
      </P>
  
      <ContainerIcon>
        <People />
        <Span>{props.autor}</Span>
      </ContainerIcon>
  
      <ContainerIcon>
        <Timer />
        <Span>{props.tiempo}</Span>
      </ContainerIcon>
  
      <ContainerImg>
        <ProfilePic width="36px" height="36px" border={true} />
        <ProfilePic width="36px" height="36px" border={true} translation={1} />
        <ProfilePic width="36px" height="36px" border={true} translation={2} />
        <ProfilePic width="36px" height="36px" border={true} translation={3} />
      </ContainerImg>
      
      <ButtonContainer>
        <WhiteIconButton onClick={() => { navigate(`../testview/${props.id}`) }}><i className="fa-solid fa-newspaper"></i></WhiteIconButton>
        <PurpleIconButton onClick={() => { navigate(`./${props.id}`) }}><i className="fa-solid fa-pen-to-square"></i></PurpleIconButton>
        <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
        <DangerIconButton onClick={borrarTest}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </ButtonContainer>

      {
        showForm && 
        <Modal titulo="Editar test" cerrar={() => setShowForm(false)}>
          <ModalTest
            test={props}
            funcion="editar"
            actualizar={() => {
              props.llenarTests();
              setShowForm(false);
            }}
          />
        </Modal>
      }
    </Container>
  )
}

export default TestCard;