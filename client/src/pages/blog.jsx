import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import ModalBlog from '../components/blog/modalBlog'
import ArticleResponse from '../components/blog/articleResponse'
import { useModal } from '../hooks/useModal'
import { PurpleButton } from '../styles/globals/formularios'

const Blog = () => {
  const [llenarArticulos, setLlenarArticulos] = useState(() => {});

  const { openModal, closeModal } = useModal(
    "Añadir blog",
    <ModalBlog 
      funcion="Añadir"
      call={() => {}}
      actualizar={() => {
        llenarArticulos();
        closeModal();
      }}
    />
  )

  return (
    <AllContainer>
      <TitleSeccion>Artículos</TitleSeccion>
      <ButtonContainer>
        <PurpleButton onClick={openModal}>Añadir</PurpleButton>
      </ButtonContainer>
      <ArticleResponse setLlenarArticulos={setLlenarArticulos} />
    </AllContainer>
  )
}

export default Blog

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: ${props => props.height};
`;

const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
  padding-left: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;