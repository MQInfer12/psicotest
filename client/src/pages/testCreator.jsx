import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSeccionesByTest } from "../services/seccion";
import { getTest } from "../services/test";
import Cargando from "../components/globals/cargando";
import SeccionCreator from "../components/testCreator/seccionCreator/seccionCreator";
import decipherId from "../utilities/decipher";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { TestCreatorContainer } from "../styles/pages/testCreator";

const TestCreator = () => {
  const windowHeight = useWindowHeight(true, true);
  const { idTest: idCode } = useParams();
  const idTest = Number(decipherId(idCode));

  const [test, setTest] = useState([]);
  const [secciones, setSecciones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [seccionActual, setSeccionActual] = useState(0);
  
  //TODO: Hacer una sola petición
  const llenarSecciones = async () => {
    const tst = await getTest({ id: idTest});
    const tstJson = await tst?.json();
    setTest(tstJson);
    const res = await getSeccionesByTest(idTest);
    const resJson = await res?.json();
    setSecciones(resJson);
    setLoading(false);
  }

  useEffect(() => {
    llenarSecciones(idTest);
  }, [])

  return (
    <TestCreatorContainer height={windowHeight}>
      {
        loading? (
          <Cargando />
        ) : (
          <>
            {
              secciones.map((v, i) => (
                <SeccionCreator 
                  key={i}
                  seccionActual={seccionActual}
                  test={test}
                  index={i + 1}
                  llenarSecciones={llenarSecciones}
                  seccionState={{seccionActual, setSeccionActual}}
                  seccion={v}
                />
              ))
            }
            <SeccionCreator
              test={test}
              seccionActual={seccionActual}
              index="nueva"
              idTest={idTest}
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