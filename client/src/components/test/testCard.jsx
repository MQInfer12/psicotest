import React from "react";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import CardButtons from "./cardButtons";

const TestCard = (props) => {
  return (
    <Container>
      <H2>{props.idRole === 1 ? props.nombre_test : props.nombre}</H2>
      <P>{props.idRole === 1 ? props.descripcion_test : props.descripcion}</P>

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-user"></i>
        </div>
        <Span>{props.idRole === 1 ? props.autor_test : props.autor}</Span>
      </ContainerIcon>

      {
        props.idRole === 1 &&
        <ContainerIcon>
          <div>
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <Span>{props.nombre_docente}</Span>
        </ContainerIcon>
      }

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-clock"></i>
        </div>
        <Span>{props.idRole === 1 ? props.tiempo_test : props.tiempo}</Span>
      </ContainerIcon>

      {
        props.idRole != 1 &&
        <ContainerImg>
          {props.usuarios.length == 0 && (
            <Span>{props.idRole === 1 ? "¡Asigna docentes a este Test!" : "¡Asigna beneficiarios a este Test!"}</Span>
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
      }
      
      <CardButtons 
        props={props}
      />
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
