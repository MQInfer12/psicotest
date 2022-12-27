import React from "react";
import { Container, ContainerIcon, ContainerImg, H2, P, Span } from "../../styles/pages/test";
import ProfilePic from "../globals/profilePic";
import CardButtons from "./testCard/cardButtons";

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
            <Span>{props.idRole === 3 ? "¡Asigna psicólogos a este Test!" : "¡Asigna beneficiarios a este Test!"}</Span>
          )}
          {props.usuarios.map((v, i) => (
            <div key={i}>
              <ProfilePic
                width="36px"
                height="36px"
                border={true}
                translation={i}
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