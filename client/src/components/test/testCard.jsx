import React, { useState } from "react";
import styled from "styled-components";
import Timer from "../../icons/timer";
import People from "../../icons/people";
import ProfilePic from "../globals/profilePic";
import Modal from "../globals/modal";
import ModalTest from "./modalTest";
import { deleteTest } from "../../services/test";

const Container = styled.div`
  width: 322px;
  height: fit-content;
  display: inline-block;
  background-color: #fff;
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid #670ce3;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: #000000;
`;

const P = styled.p`
  margin-top: 12px;
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
  margin-top: 21px;
`;

const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 26px;
  gap: -16px;
`;

const TestCard = (props) => {
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

      <button onClick={() => setShowForm(true)}>Editar</button>
      <button onClick={borrarTest}>Eliminar</button>

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