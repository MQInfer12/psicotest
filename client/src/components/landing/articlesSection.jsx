import React from 'react'
import { ArticleContainer, ArticlesSectionContainer, ArticlesTitleText } from '../../styles/pages/landing'
import ArticleResponse from '../blog/articleResponse'

const ArticlesSection = () => {
  return (
    <ArticlesSectionContainer>
      <ArticlesTitleText>Mira unos cuantos artículos</ArticlesTitleText>
      <ArticleContainer>
        <ArticleResponse fwrap={false} />
      </ArticleContainer>
    </ArticlesSectionContainer>
  )
}

export default ArticlesSection