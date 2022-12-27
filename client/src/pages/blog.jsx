import React from 'react'
import { useState } from 'react'
import ModalBlog from '../components/blog/modalBlog'
import ArticleResponse from '../components/blog/articleResponse'
import { useModal } from '../hooks/useModal'
import { PurpleButton } from '../styles/globals/formularios'
import { AllContainer, ButtonContainer, TitleSeccion } from '../styles/pages/blog'

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