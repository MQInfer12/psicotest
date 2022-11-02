import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getSeccionesByTest } from "../services/seccion";
import { getTest } from "../services/test";
import Cargando from "../components/globals/cargando";
import SeccionCreator from "../components/testCreator/seccionCreator/seccionCreator";
import decipherId from "../utilities/decipher";

//CONTROLES ARRIBA
const TestCreatorContainer = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  overflow: hidden;
`;

const TestCreator = () => {
  const { idTest: idCode } = useParams();
  const idTest = Number(decipherId(idCode));

  const [test, setTest] = useState([]);
  const [secciones, setSecciones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [seccionActual, setSeccionActual] = useState(0);
  
  const llenarSecciones = async () => {
    const tst = await getTest(idTest);
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
    <TestCreatorContainer>
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
                  test={test[0]}
                  index={i + 1}
                  llenarSecciones={llenarSecciones}
                  seccionState={{seccionActual, setSeccionActual}}
                  seccion={v}
                />
              ))
            }
            <SeccionCreator
              test={test[0]}
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