import React, { useState } from "react";
import SeccionSidebar from "./seccionSidebar";
import PreguntaCreator from "../preguntaCreator/preguntaCreator";
import ReactivoCreator from "../reactivoCreator/reactivoCreator";
import { CreatorsContainer, EmptySeccion, FullScreen, SeccionContainer } from "../../../styles/pages/testCreator";
import useGet from "../../../hooks/useGet";
import { useTestCreatorContext } from "../../../context/testCreatorContext";

const SeccionCreator = ({ test, llenarSecciones }) => {
  const [editActual, setEditActual] = useState(0);

  const { seccion, setSecciones, seccionActual } = useTestCreatorContext();

  const { callAPI: llenarSeccion } = useGet(`seccion/full/${seccion?.id}`, {
    callback: (fullSeccion) => {
      setSecciones(old => {
        return old.map((v, i) => {
          if(i === seccionActual) {
            return fullSeccion;
          }
          return v;
        });
      });
    }
  });

  return (
    <SeccionContainer>
      <SeccionSidebar 
        test={test}
        llenarSecciones={llenarSecciones}
        editState={{editActual, setEditActual}}
      />
      {
        !seccion ? (
          <CreatorsContainer>
            <FullScreen translate="0">
              <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
            </FullScreen>
          </CreatorsContainer>
        ) : (
          <CreatorsContainer>
            <FullScreen translate={editActual}>
              <PreguntaCreator llenarSeccion={llenarSeccion} />
            </FullScreen>
            <FullScreen translate={editActual}>
              <ReactivoCreator llenarSeccion={llenarSeccion} />
            </FullScreen>
          </CreatorsContainer>
        )
      }
    </SeccionContainer>
  )
}

export default SeccionCreator;