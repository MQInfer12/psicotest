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
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid;
  border-color: rgba(102, 11, 225, 0.15) rgba(102, 11, 225, 0.25) rgba(102, 11, 225, 0.35) rgba(102, 11, 225, 0.5);
  box-sizing: border-box;
  animation: rotation 1s infinite;

  @keyframes rotation {
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

const Cargando = ({ text = true, width = "80px", height = "80px" }) => {
  return (
    <DivLoader>
      <Loader width={width} height={height}></Loader>
      {
        text && 
        <SpanLoader>Cargando...</SpanLoader>
      }
    </DivLoader>
  )
}

export default Cargando;