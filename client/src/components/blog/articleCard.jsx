import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { pdfIndividual } from "../../services/articulo";
import { PurpleButton } from "../../styles/globals/formularios";
import { ArticleCardContainer, ArticleCardH2, ArticleCardP, CardButtonContainer, VerMasButton } from "../../styles/pages/blog";
import { ContainerIcon, Span } from "../../styles/pages/test";
import ProfilePic from "../globals/profilePic";
import CardButtons from "./cardButtons";

const LINE_HEIGHT = 24;

const ArticleCard = ({ article, inLanding, llenarArticulos }) => {
  const PTextRef = useRef();
  const { user } = useUserContext();
  const [lines, setLines] = useState(0);
  const [viewMore, setViewMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleViewDoc = async (id) => {
    setLoading(true);
    await pdfIndividual(id);
    setLoading(false);
  }

  useEffect(() => {
    setLines(PTextRef.current.scrollHeight / LINE_HEIGHT);
  }, [PTextRef]);

  return (
    <ArticleCardContainer viewMore={viewMore} inLanding={inLanding || user.id_rol === 1}>
      <div>
        <ArticleCardH2 title={article.titulo}>{article.titulo}</ArticleCardH2>
        <ContainerIcon>
          <ProfilePic title="Autor" width="25px" height="25px" border perfil={article.perfil}/>
          <Span>{article.nombre_autor}</Span>
        </ContainerIcon>
        <ArticleCardP viewMore={viewMore} className="ptext" ref={PTextRef}>
          {article.descripcion}
        </ArticleCardP>
        {
          lines > 2 &&
          <VerMasButton onClick={() => setViewMore(!viewMore)}>
            {
              !viewMore ? 
              <>
                Ver más
                <i className="fa-solid fa-chevron-down"></i>
              </> :
              <>
                <i className="fa-solid fa-chevron-up"></i>
                Ver menos
              </>
            }
          </VerMasButton>
        }
      </div>
      <div>
        <PurpleButton 
          disabled={loading} 
          onClick={() => handleViewDoc(article.id)}
        >{loading ? "Descargando..." : "Ver adjunto" }<i className="fa-solid fa-file-pdf"></i></PurpleButton>
        {
          ((!inLanding && article.id_docente === user.id) || user.id_rol === 3) &&
          <CardButtons 
            article={article}
            llenarArticulos={llenarArticulos}
          />
        }
      </div>
    </ArticleCardContainer>
  );
};

export default ArticleCard;