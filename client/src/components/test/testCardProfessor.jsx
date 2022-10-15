import React, { useState } from "react";
import styled from "styled-components";
import Timer from "../../icons/timer";
import People from "../../icons/people";
import ProfilePic from "../globals/profilePic";
import Modal from "../globals/modal";
import {
  deleteTest,
} from "../../services/test";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton } from "../../styles/formularios";
import ModalAssignBenef from "./modalAssignBenef";
import ModalUnassign from "./modalUnassignBenef";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

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
  color: #D9D9D9;
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    width: 25px;
    text-align: center;
  }
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

  const [showAddBenef, setShowAddBenef] = useState(false);
  const [showUnassignBenef, setShowUnassignBenef] = useState(false);
  const { user } = useContext(UserContext);
  const idRole = user.id_rol;

  return (
    <Container>
      <H2>{props.nombre}</H2>
      <P>{props.descripcion}</P>

      <ContainerIcon>
        <div><i className="fa-solid fa-user"></i></div>
        <Span>{props.autor}</Span>
      </ContainerIcon>

      <ContainerIcon>
        <div><i className="fa-solid fa-clock"></i></div>
        <Span>{props.tiempo}</Span>
      </ContainerIcon>

      {props.usuarios && (
        <ContainerImg>
          {props.usuarios.map((v, i) => (
            <div key={i}>
              <ProfilePic
                width="36px"
                height="36px"
                border={true}
                src={v.perfil}
                translation={i}
              />
            </div>
          ))}
        </ContainerImg>
      )}

    
      {/*IF IS PROFESSOR */}

      {idRole === 2 && (
        <ButtonContainer>
          <WhiteIconButton onClick={() => navigate(`../testview/${props.id_test}`)}>
            <i className="fa-solid fa-newspaper"></i>
          </WhiteIconButton>

          <WhiteIconButton onClick={() => setShowAddBenef(true)}>
            <i className="fa-sharp fa-solid fa-user-plus"></i>
          </WhiteIconButton>

          <WhiteIconButton onClick={() => setShowUnassignBenef(true)}>
            <i className="fa-solid fa-user-minus"></i>
          </WhiteIconButton>
        </ButtonContainer>
      )}

     {showAddBenef && (
        <Modal
          titulo="Asignar beneficiario"
          cerrar={() => setShowAddBenef(false)}
        >
          <ModalAssignBenef
            id={props.id}
            actualizar={() => {
/*               props.llenarTests(); */
              setShowAddBenef(false);
            }}
          />
        </Modal>
      )} 

      {showUnassignBenef && (
        <Modal
          titulo="Desasignar beneficiario"
          cerrar={() => setShowUnassignBenef(false)}
        >
          <ModalUnassign
            id={props.id}
            actualizar={() => {
              setShowUnassignBenef(false);
            }}
          />
        </Modal>
      )} 
    </Container>
  );
};

export default TestCard;
