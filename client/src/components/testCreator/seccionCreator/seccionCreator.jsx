import React, { useState } from "react";
import SeccionSidebar from "./seccionSidebar";
import PreguntaCreator from "../preguntaCreator/preguntaCreator";
import ReactivoCreator from "../reactivoCreator/reactivoCreator";
import { CreatorsContainer, EmptySeccion, FullScreen, SeccionContainer } from "../../../styles/pages/testCreator";
import useGet from "../../../hooks/useGet";
import Cargando from "../../globals/cargando";

const SeccionCreator = ({ seccionActual, test, seccion, index, llenarSecciones, seccionState }) => {
  const [editActual, setEditActual] = useState(0);

  const { 
    callAPI: llenarSeccion, 
    resJson: fullSeccion, 
    loading 
  } = useGet(`seccion/full/${seccion?.id}`, { initialValue: { preguntas: [], reactivos: [], puntuaciones: [] }, trigger: [seccion], alwaysLoading: true });

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
        index == "nueva" ? (
          <CreatorsContainer>
            <FullScreen translate="0">
              <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
            </FullScreen>
          </CreatorsContainer>
        ) : (
          <CreatorsContainer>
            {
              loading ? (
                <FullScreen translate="0">
                  <Cargando />
                </FullScreen>
              ) : (
                <>
                  <FullScreen translate={editActual}>
                    <PreguntaCreator 
                      idSeccion={seccion.id}
                      preguntas={fullSeccion.preguntas}
                      llenarSeccion={llenarSeccion}
                    />
                  </FullScreen>
                  <FullScreen translate={editActual}>
                    <ReactivoCreator
                      idSeccion={seccion.id}
                      reactivos={fullSeccion.reactivos}
                      preguntas={fullSeccion.preguntas}
                      oldPuntuaciones={fullSeccion.puntuaciones}
                      llenarSeccion={llenarSeccion}
                    />
                  </FullScreen>
                </>
              )
            }
          </CreatorsContainer>
        )
      }
    </SeccionContainer>
  )
}

export default SeccionCreator;