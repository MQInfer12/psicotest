import React from 'react';
import { CargandoContainer, DivLoader, Loader, SpanLoader } from '../../styles/global-components/cargando';

const Cargando = ({ text = true, width = "80px", height = "80px", container, windowHeight}) => {
  return container ? (
    <CargandoContainer height={windowHeight ? windowHeight : "100%"}>
      <DivLoader>
        <Loader width={width} height={height}></Loader>
        {
          text && 
          <SpanLoader>Cargando...</SpanLoader>
        }
      </DivLoader>
    </CargandoContainer>
  ) : (
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