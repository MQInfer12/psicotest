import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton } from "../../styles/formularios";

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

const TestCardBenef = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <H2>{props.nombre_test}</H2>
      <P>{props.descripcion_test}</P>

      <ContainerIcon>
        <div><i className="fa-solid fa-user"></i></div>
        <Span>{props.autor_test}</Span>
      </ContainerIcon>

      <ContainerIcon>
        <div><i className="fa-solid fa-graduation-cap"></i></div>
        <Span>{props.nombre_docente}</Span>
      </ContainerIcon>

      <ContainerIcon>
        <div><i className="fa-solid fa-clock"></i></div>
        <Span>{props.tiempo_test}</Span>
      </ContainerIcon>

      <ButtonContainer>
        <WhiteIconButton onClick={() => navigate(`../testview/${props.id_test}`)}>
          <i className="fa-solid fa-newspaper"></i>
        </WhiteIconButton>
      </ButtonContainer>
    </Container>
  );
};

export default TestCardBenef;
