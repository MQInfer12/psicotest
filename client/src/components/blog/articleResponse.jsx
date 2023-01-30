import React from 'react'
import { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import useGet from '../../hooks/useGet';
import { useModal } from '../../hooks/useModal';
import { PurpleButton } from '../../styles/globals/formularios';
import { ArticleContainer, ButtonContainer, DivNothing, SearchSelect } from '../../styles/pages/blog';
import Cargando from '../globals/cargando';
import ArticleCard from './articleCard';
import ModalBlog from './modalBlog';

const ArticleResponse = ({ inLanding = false }) => {
  const { user } = useUserContext();
  const [filter, setFilter] = useState("mis");

  const { resJson: articles, loading, callAPI: llenarArticulos } = useGet(
    (!user.isLogged || user.id_rol === 1) ? 
    `articulo/landing/destacados` : `articulo/docente/${user.id}`
  );

  const { openModal, closeModal } = useModal(
    "Añadir blog",
    <ModalBlog 
      funcion="Añadir"
      actualizar={() => {
        llenarArticulos();
        closeModal();
      }}
    />
  )

  if(loading) return <Cargando />;

  const filterArticles = () => {
    let newArticles = articles;
    if(user.isLogged && user.id_rol !== 1) {
      if(filter === "mis") {
        newArticles = articles.filter(articulo => articulo.id_docente === user.id);
      }
      if(filter === "destacados") {
        newArticles = articles.filter(articulo => articulo.destacado);
      }
    }
    return newArticles;
  }

  return (
    <>
      {
        (!inLanding && user.id_rol != 1) &&
        <ButtonContainer>
          <PurpleButton onClick={openModal}>Añadir</PurpleButton>
        </ButtonContainer>
      }
      {
        (!inLanding && user.id_rol != 1) &&
        <SearchSelect onChange={(e) => setFilter(e.target.value)}>
          <option value="mis">Mis artículos</option>
          {user.id_rol === 3 && <option value="todos">Todos</option>}
          <option value="destacados">Destacados</option>
        </SearchSelect>
      }
      <ArticleContainer inLanding={inLanding}>
        {
          ((inLanding || user.id_rol === 1) && filterArticles().length === 0) ?
          <DivNothing>No hay artículos destacados en este momento.</DivNothing> :
          (filter === "mis" && filterArticles().length === 0) ?
          <DivNothing>No tienes artículos aún.</DivNothing> :
          (filter === "todos" && filterArticles().length === 0) ?
          <DivNothing>No existen artículos aún.</DivNothing> :
          (filter === "destacados" && filterArticles().length === 0) ?
          <DivNothing>¡Destaca artículos para que aparezcan en la pantalla inicial!</DivNothing> :
          filterArticles().map((v) => (
            <ArticleCard key={v.id}
              article={v}
              inLanding={inLanding}
              llenarArticulos={llenarArticulos}
            />
          ))
        }
      </ArticleContainer>
    </>
  )
}

export default ArticleResponse