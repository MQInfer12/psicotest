import React from 'react'
import ArticleResponse from '../components/blog/articleResponse'
import { useUserContext } from '../context/userContext'
import { AllContainer, TitleSeccion } from '../styles/pages/blog'

const Blog = () => {
  const { user } = useUserContext();

  return (
    <AllContainer>
      <TitleSeccion>Artículos {user.id_rol === 1 && "destacados"}</TitleSeccion>
      <ArticleResponse />
    </AllContainer>
  )
}

export default Blog