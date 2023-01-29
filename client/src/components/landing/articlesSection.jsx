import React from 'react'
import { ArticleContainer, ArticlesSectionContainer, ArticlesTitleText } from '../../styles/pages/landing'
import ArticleResponse from '../blog/articleResponse'

const ArticlesSection = () => {
  return (
    <ArticlesSectionContainer>
      <ArticlesTitleText>Artículos destacados</ArticlesTitleText>
      <ArticleContainer>
        <ArticleResponse inLanding />
      </ArticleContainer>
    </ArticlesSectionContainer>
  )
}

export default ArticlesSection