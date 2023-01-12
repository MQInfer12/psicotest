import React from "react";
import { useParams } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import SeccionCreator from "../components/testCreator/seccionCreator/seccionCreator";
import decipherId from "../utilities/decipher";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { TestCreatorContainer } from "../styles/pages/testCreator";
import useGet from "../hooks/useGet";
import {  useTestCreatorContext } from "../context/testCreatorContext";

const TestCreator = () => {
  const windowHeight = useWindowHeight(true, true);
  const { idTest: idCode } = useParams();
  const idTest = Number(decipherId(idCode));
  const { setSecciones, setDimensiones, setEscalas } = useTestCreatorContext();

  //LLENAR EL TEST ENTERO
  const { resJson: test, loading } = useGet(`test/edit/${idTest}`, { 
    alwaysLoading: true, 
    callback: (res) => {
      setSecciones(res.secciones);
      setDimensiones(res.dimensiones);
      setEscalas(res.escalas);
    } 
  });

  return (
    <TestCreatorContainer height={windowHeight}>
      {
        loading ? (
          <Cargando />
        ) : (
          <SeccionCreator test={test} />
        )
      }
    </TestCreatorContainer>
  )
}

export default TestCreator;