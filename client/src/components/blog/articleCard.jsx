import React from "react";
import { pdfIndividual } from "../../services/articulo";
import { PurpleButton } from "../../styles/globals/formularios";
import { ArticleCardContainer, ArticleCardH2, ArticleCardP } from "../../styles/pages/blog";

const ArticleCard = ({article}) => {
  return (
    <ArticleCardContainer>
      <ArticleCardH2>{article.titulo}</ArticleCardH2>
      <ArticleCardP>{article.descripcion}</ArticleCardP>
      <PurpleButton onClick={() => pdfIndividual(article.id)}>Ver más<i className="fa-solid fa-file-pdf"></i></PurpleButton>
    </ArticleCardContainer>
  );
};

export default ArticleCard;