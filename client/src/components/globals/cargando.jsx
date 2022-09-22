import React from 'react';
import styled from 'styled-components';

const DivLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const Loader = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid rgba(0, 0, 0, 0.2);
  border-top-color: #9c27b0;
  animation: spin 1.2s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpanLoader = styled.span`
  color: #1a3260;
  text-transform: uppercase;
`;

const Cargando = () => {
  return (
    <DivLoader>
      <Loader></Loader>
      <SpanLoader>Cargando...</SpanLoader>
    </DivLoader>
  )
}

export default Cargando;