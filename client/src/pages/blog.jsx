import React from 'react'
import ArticleResponse from '../components/blog/articleResponse'
import { AllContainer, TitleSeccion } from '../styles/pages/blog'

const Blog = () => {
  return (
    <AllContainer>
      <TitleSeccion>Artículos</TitleSeccion>
      <ArticleResponse />
    </AllContainer>
  )
}

export default Blog