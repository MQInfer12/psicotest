import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TestFeatures from "../components/testView/testFeatures";
import TestResolution from "../components/testView/testResolution";
import decipherId from "../utilities/decipher";
import { useOutletContext } from "react-router-dom";
import TestChat from "../components/testView/testViewChat";
import Cargando from "../components/globals/cargando";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { AllContainer, Paragraph, TestContainer, TestTextContainer, TestTitle } from "../styles/pages/testView";
import useGet from "../hooks/useGet";
import { useUserContext } from "../context/userContext";

const TestView = () => {
  const windowHeight = useWindowHeight(true, true);

  const { idTest: idTestCode, idRespuesta: idRespCode } = useParams();
  const idTest = idTestCode && Number(decipherId(idTestCode));
  const idRespuesta = idRespCode && Number(decipherId(idRespCode));

  const activateSend = !!idRespCode;

  const { user } = useUserContext();
  const { resJson: test, loading } = useGet(`test/full/${user.id}/${idRespuesta ? idRespuesta : idTest}`, { alwaysLoading: true });

  const { handleScrollTop } = useOutletContext();
  useEffect(() => {
    window.scroll(0, 0);
    handleScrollTop();
  }, []);

  if(loading) return <Cargando container windowHeight={windowHeight} />

  return (
    <AllContainer height={windowHeight}>
      <TestTextContainer>
        <TestTitle>
          {test.nombre}
        </TestTitle>
        <Paragraph>{test.descripcion}</Paragraph>
      </TestTextContainer>
      <TestContainer>
        <TestFeatures idTest={test.id} caracteristicas={test.caracteristicas} />
        <TestResolution
          nombreTest={test.nombre}
          secciones={test.secciones}
          activateSend={activateSend}
          idRespuesta={idRespuesta}
          infoSend={
            idTest
              ? "Solo los beneficiarios pueden enviar respuestas"
              : "Ya enviaste este test"
          }
        />
        {
          test.email_docente &&
          <TestChat email_docente={test.email_docente} />
        }
      </TestContainer>
    </AllContainer>
  );
};

export default TestView;