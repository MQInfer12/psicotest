import React, { useState } from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import Modal from "../globals/modal";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton } from "../../styles/formularios";
import ModalAssignBenef from "./modalAssignBenef";
import ModalUnassign from "./modalUnassignBenef";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

const TestCard = (props) => {
  const { handleScrollTop } = useOutletContext();
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

      <ContainerImg>
        {
          props.usuarios.length == 0 &&
          <Span>¡Asigna beneficiarios a este Test!</Span>
        }
        {
          props.usuarios.map((v, i) => (
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
          ))
        }
      </ContainerImg>
    
      {/*IF IS PROFESSOR */}

      {idRole === 2 && (
        <ButtonContainer>
          <WhiteIconButton 
            onClick={() => {
              navigate(`./testview/${props.id_test}`);
              handleScrollTop();
            }}
          >
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
              props.llenarTests();
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
              props.llenarTests();
              setShowUnassignBenef(false);
            }}
          />
        </Modal>
      )} 
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
  height: 43px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;