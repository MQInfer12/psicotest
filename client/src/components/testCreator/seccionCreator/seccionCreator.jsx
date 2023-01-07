import React, { useState } from "react";
import SeccionSidebar from "./seccionSidebar";
import PreguntaCreator from "../preguntaCreator/preguntaCreator";
import ReactivoCreator from "../reactivoCreator/reactivoCreator";
import { CreatorsContainer, EmptySeccion, FullScreen, SeccionContainer } from "../../../styles/pages/testCreator";
import { useTestCreatorContext } from "../../../context/testCreatorContext";
import Cargando from "../../globals/cargando";
import DimensionCreator from "../dimensionCreator/dimensionCreator";

const SeccionCreator = ({ test }) => {
  const [editActual, setEditActual] = useState(0);
  const [loadingNewSection, setLoadingNewSection] = useState(false);
  const [page, setPage] = useState(1);

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
            {
              ['dimensiones', 'preguntas', 'reactivos'].map((v, i) => (
                <FullScreen key={i} translate={editActual}>
                  {
                    loadingNewSection ? 
                    <Cargando /> :
                    <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
                  }
                </FullScreen>
              ))
            }
          </CreatorsContainer>
        ) : (
          <CreatorsContainer>
            <FullScreen translate={editActual}>
              <DimensionCreator />
            </FullScreen>
            <FullScreen translate={editActual}>
              <PreguntaCreator pageState={{page, setPage}} />
            </FullScreen>
            <FullScreen translate={editActual}>
              <ReactivoCreator pageState={{page, setPage}} />
            </FullScreen>
          </CreatorsContainer>
        )
      }
    </SeccionContainer>
  )
}

export default SeccionCreator;