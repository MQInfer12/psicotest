import React, { useState } from "react";
import SeccionSidebar from "./seccionSidebar";
import PreguntaCreator from "../preguntaCreator/preguntaCreator";
import ReactivoCreator from "../reactivoCreator/reactivoCreator";
import { CreatorsContainer, EmptySeccion, FullScreen, SeccionContainer } from "../../../styles/pages/testCreator";
import { useTestCreatorContext } from "../../../context/testCreatorContext";
import Cargando from "../../globals/cargando";

const SeccionCreator = ({ test }) => {
  const [editActual, setEditActual] = useState(0);
  const [loadingNewSection, setLoadingNewSection] = useState(false);

  const { seccion } = useTestCreatorContext();

  return (
    <SeccionContainer>
      <SeccionSidebar 
        loading={loadingNewSection}
        setLoading={setLoadingNewSection}
        test={test}
        editState={{editActual, setEditActual}}
      />
      {
        !seccion ? (
          <CreatorsContainer>
            <FullScreen translate="0">
              {
                loadingNewSection ? 
                <Cargando /> :
                <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
              }
            </FullScreen>
          </CreatorsContainer>
        ) : (
          <CreatorsContainer>
            <FullScreen translate={editActual}>
              <PreguntaCreator />
            </FullScreen>
            <FullScreen translate={editActual}>
              <ReactivoCreator />
            </FullScreen>
          </CreatorsContainer>
        )
      }
    </SeccionContainer>
  )
}

export default SeccionCreator;