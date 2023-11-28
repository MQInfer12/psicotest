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
        <ProfilePic title="Autor" width="25px" height="25px" border perfil={props.perfil}/>
        <Span>{props.idRole === 1 ? props.autor_test : props.autor}</Span>
      </ContainerIcon>
      {
        props.idRole === 1 &&
        <ContainerIcon>
          <div><i title="Mi psicólogo" className="fa-solid fa-graduation-cap"></i></div>
          <Span>{props.nombre_docente}</Span>
        </ContainerIcon>
      }
      <ContainerIcon>
        <div><i title="Tiempo estimado" className="fa-solid fa-clock"></i></div>
        <Span>{props.idRole === 1 ? props.tiempo_test : props.tiempo}</Span>
      </ContainerIcon>
      {
        props.idRole != 1 &&
        <ContainerImg>
          {props.usuarios.length == 0 && (
            <Span>¡Asigna beneficiarios a este Test!</Span>
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