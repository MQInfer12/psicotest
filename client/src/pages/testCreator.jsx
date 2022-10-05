import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getSeccionesByTest } from "../services/seccion";
import PreguntaCreator from "../components/testCreator/preguntaCreator";
import SeccionCreator from "../components/testCreator/seccionCreator";

//CONTROLES ARRIBA
const TestCreatorContainer = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  overflow: hidden;
`;

const SeccionContainer = styled.div`
  transform: translate(${props => props.translate * -100}%);
  min-width: 100%;
  height: 100%;
  display: flex;
  transition: all 1s;
`;

const CreatorsContainer = styled.div`
  min-width: calc(100% - 263px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptySeccion = styled.p`
  width: 400px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.6;
  text-align: center;
`;

const TestCreator = () => {
  const { idTest } = useParams();
  const [secciones, setSecciones] = useState([]);
  const [seccionActual, setSeccionActual] = useState(0);
  
  const llenarSecciones = async () => {
    const res = await getSeccionesByTest(idTest);
    const resJson = await res?.json();
    setSecciones(resJson);
  }

  useEffect(() => {
    llenarSecciones(idTest);
  }, [])

  return (
    <TestCreatorContainer>
      {
        secciones.map((v, i) => (
          <SeccionContainer key={i} translate={seccionActual}>
            <SeccionCreator 
              index={i + 1}
              idTest={idTest} 
              seccion={v}
              llenarSecciones={llenarSecciones}
              actualState={{seccionActual, setSeccionActual}}
            />
            <CreatorsContainer>
              <PreguntaCreator />
            </CreatorsContainer>
          </SeccionContainer>
        ))
      }
      <SeccionContainer translate={seccionActual}>
        <SeccionCreator 
          index="nueva"
          idTest={idTest} 
          llenarSecciones={llenarSecciones}
          actualState={{seccionActual, setSeccionActual}}
        />
        <CreatorsContainer>
          <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
        </CreatorsContainer>
      </SeccionContainer>
    </TestCreatorContainer>
  )
}

export default TestCreator;