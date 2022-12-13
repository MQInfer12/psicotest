import React from 'react'
import styled from 'styled-components'
import ArticleResponse from '../blog/articleResponse'

const ArticlesSection = () => {
  return (
    <Container>
      <TitleText>Mira unos cuantos artículos</TitleText>
      <ArticleContainer>
        <ArticleResponse fwrap={false} />
      </ArticleContainer>
    </Container>
  )
}

export default ArticlesSection

const Container = styled.div`
  padding: 40px;
  background-color: #f5f5f5;
`;

const TitleText = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  padding-bottom: 30px;

  &::after {
    content: ".";
    color: #6209db;
  }
`;

const ArticleContainer = styled.div`
  overflow: auto;
  padding: 20px;
`;