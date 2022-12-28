import React from 'react'
import { useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import useGet from '../../hooks/useGet';
import { ArticleContainer } from '../../styles/pages/blog';
import ArticleCard from './articleCard';

const ArticleResponse = ({ fwrap = true, setLlenarArticulos = () => {} }) => {
  const { user } = useUserContext();

  const { resJson: articles, loading, callAPI: llenarArticulos } = useGet(`articulo/docente/${user.id}`);

  useEffect(() => {
    setLlenarArticulos(() => llenarArticulos);
  }, [])

  return (
    <ArticleContainer fwrap={fwrap}>
      {
        articles.map((v, i) => (
          <ArticleCard key={i}
            article={v}
          />
        ))
      }
    </ArticleContainer>
  )
}

export default ArticleResponse