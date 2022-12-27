import React, { useState } from "react";
import SeccionSidebar from "./seccionSidebar";
import PreguntaCreator from "../preguntaCreator/preguntaCreator";
import ReactivoCreator from "../reactivoCreator/reactivoCreator";
import { CreatorsContainer, EmptySeccion, FullScreen, SeccionContainer } from "../../../styles/pages/testCreator";

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
                idSeccion={seccion.id}
                preguntas={preguntas}
                setPreguntas={setPreguntas}
                reactivos={reactivos}
                setPuntuaciones={setPuntuaciones}
              />
            </FullScreen>
            <FullScreen translate={editActual}>
              <ReactivoCreator
                idSeccion={seccion.id}
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