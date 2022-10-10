import React, { useState } from "react";
import styled from "styled-components";
import SeccionSidebar from "./seccionSidebar";
import PreguntaCreator from "../preguntaCreator/preguntaCreator";
import ReactivoCreator from "../reactivoCreator/reactivoCreator";

const SeccionContainer = styled.div`
  transform: translateX(${props => props.translate * -100}%);
  min-width: 100%;
  height: 100%;
  display: flex;
  transition: all 1.5s;
`;

const CreatorsContainer = styled.div`
  min-width: calc(100% - 263px);
  display: flex;
  flex-direction: column;
`;

const FullScreen = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${props => props.translate * -100}%);
  transition: all 1s;
`;

const EmptySeccion = styled.p`
  width: 400px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.6;
  text-align: center;
`;

const SeccionCreator = ({ seccionActual, test, seccion, index, llenarSecciones, seccionState }) => {
  const [editActual, setEditActual] = useState(0);

  const [preguntas, setPreguntas] = useState([]);
  const [reactivos, setReactivos] = useState([]);
  const [puntuaciones, setPuntuaciones] = useState([]);

  return (
    <SeccionContainer translate={seccionActual}>
      <SeccionSidebar 
        test={test}
        seccion={seccion}
        index={index}
        llenarSecciones={llenarSecciones}
        seccionState={seccionState}
        editState={{editActual, setEditActual}}
      />
      {
        index == "nueva"? (
          <CreatorsContainer>
            <FullScreen translate="0">
              <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
            </FullScreen>
          </CreatorsContainer>
        ) : (
          <CreatorsContainer>
            <FullScreen translate={editActual}>
              <PreguntaCreator 
                idSeccion={seccion?.id}
                preguntas={preguntas}
                setPreguntas={setPreguntas}
                reactivos={reactivos}
                setPuntuaciones={setPuntuaciones}
              />
            </FullScreen>
            <FullScreen translate={editActual}>
              <ReactivoCreator
                idSeccion={seccion?.id}
                reactivos={reactivos}
                setReactivos={setReactivos}
                puntuaciones={puntuaciones}
                setPuntuaciones={setPuntuaciones}
                preguntas={preguntas}
              />
            </FullScreen>
          </CreatorsContainer>
        )
      }
    </SeccionContainer>
  )
}

export default SeccionCreator;