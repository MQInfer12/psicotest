import React from 'react'
import { useEffect } from 'react';
import { useUserContext } from '../../context/userContext';
import useGet from '../../hooks/useGet';
import { getArticuloByDocente } from '../../services/articulo';
import { ArticleContainer } from '../../styles/pages/blog';
import ArticleCard from './articleCard';

const ArticleResponse = ({ fwrap = true, setLlenarArticulos = () => {} }) => {
  const { user } = useUserContext();

  const { resJson: articles, loading, callAPI: llenarArticulos } = useGet(getArticuloByDocente, { id: user.isLogged ? user.id : 88 });

  useEffect(() => {
    setLlenarArticulos(llenarArticulos);
  }, [])

  useEffect(() => {
    console.log(articles);
  }, [articles])

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