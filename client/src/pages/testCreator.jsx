import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import SeccionCreator from "../components/testCreator/seccionCreator/seccionCreator";
import decipherId from "../utilities/decipher";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { TestCreatorContainer } from "../styles/pages/testCreator";
import useGet from "../hooks/useGet";

const TestCreator = () => {
  const windowHeight = useWindowHeight(true, true);
  const { idTest: idCode } = useParams();
  const idTest = Number(decipherId(idCode));

  const [seccionActual, setSeccionActual] = useState(0);
  
  const { callAPI: llenarSecciones, resJson: test, loading } = useGet(`test/edit/${idTest}`, { alwaysLoading: true });

  return (
    <TestCreatorContainer height={windowHeight}>
      {
        loading? (
          <Cargando />
        ) : (
          <>
            {
              test.secciones.map((v, i) => (
                <SeccionCreator key={i}
                  seccionActual={seccionActual}
                  test={test}
                  seccion={v}
                  index={i + 1}
                  llenarSecciones={llenarSecciones}
                  seccionState={{seccionActual, setSeccionActual}}
                />
              ))
            }
            <SeccionCreator
              test={test}
              seccionActual={seccionActual}
              index="nueva"
              llenarSecciones={llenarSecciones}
              seccionState={{seccionActual, setSeccionActual}}
            />
          </>
        )
      }
    </TestCreatorContainer>
  )
}

export default TestCreator;