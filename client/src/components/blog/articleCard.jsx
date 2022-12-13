import React from "react";
import styled from "styled-components";
import { pdfIndividual } from "../../services/articulo";
import { PurpleButton } from "../../styles/globals/formularios";

const ArticleCard = ({article}) => {
  return (
    <Container>
      <H2>{article.titulo}</H2>
      <P>{article.descripcion}</P>
      <PurpleButton onClick={() => pdfIndividual(article.id)}>Ver más<i className="fa-solid fa-file-pdf"></i></PurpleButton>
    </Container>
  );
};

export default ArticleCard;

const Container = styled.div`
  min-width: 322px;
  max-width: 322px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const P = styled.p`
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