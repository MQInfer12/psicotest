import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton } from "../../styles/formularios";
import codeId from "../../utilities/code";

const TestCardBenef = (props) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    let stringInd = id.toString();
    let idCode = codeId(stringInd);
    navigate(`./testresolve/${idCode}`);
  };

  return (
    <Container>
      <H2>{props.nombre_test}</H2>
      <P>{props.descripcion_test}</P>

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-user"></i>
        </div>
        <Span>{props.autor_test}</Span>
      </ContainerIcon>

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <Span>{props.nombre_docente}</Span>
      </ContainerIcon>

      <ContainerIcon>
        <div>
          <i className="fa-solid fa-clock"></i>
        </div>
        <Span>{props.tiempo_test}</Span>
      </ContainerIcon>

      <ButtonContainer>
        <WhiteIconButton title="Resolver test" onClick={() => handleClick(props.id)}>
          <i className="fa-solid fa-newspaper"></i>
        </WhiteIconButton>
      </ButtonContainer>
    </Container>
  );
};

export default TestCardBenef;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
