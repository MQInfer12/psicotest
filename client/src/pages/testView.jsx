import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TestFeatures from "../components/testView/testFeatures";
import TestResolution from "../components/testView/testResolution";
import { getIdTest } from "../services/respuesta";
import { getFullTest } from "../services/test";
import decipherId from "../utilities/decipher";
import { useOutletContext } from "react-router-dom";
import TestChat from "../components/testView/testViewChat";
import Cargando from "../components/globals/cargando";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { AllContainer, Paragraph, TestContainer, TestTextContainer, TestTitle } from "../styles/pages/testView";

const TestView = () => {
  const windowHeight = useWindowHeight(true, true);
  const { idTest: idTestCode } = useParams();
  const { idRespuesta: idRespCode } = useParams();
  const { handleScrollTop } = useOutletContext();

  const [idTest, setIdTest] = useState(undefined);
  const [idRespuesta, setIdRespuesta] = useState(undefined);
  const [email_docente, setEmail_docente] = useState("");
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState([]);
  const [activateSend, setActivateSend] = useState(false);

  const llenarTest = async (id) => {
    const res = await getFullTest({ id });
    const resJson = await res?.json();
    setTest(resJson);
    setLoading(false);
  };

  const getTestId = async (id) => {
    const res = await getIdTest({ id });
    const resJson = await res?.json();
    setEmail_docente(resJson.email_docente);
    if (resJson.estado != 0) {
      setActivateSend(false);
    }
    const restest = await getFullTest({ id: resJson.id_test });
    const restestJson = await restest?.json();
    setTest(restestJson);
    setLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    handleScrollTop();

    if (idTestCode) {
      setIdTest(Number(decipherId(idTestCode)));
      llenarTest(Number(decipherId(idTestCode)));
    }
    if (idRespCode) {
      setIdRespuesta(Number(decipherId(idRespCode)));
      getTestId(Number(decipherId(idRespCode)));
      setActivateSend(true);
    }
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
          email_docente &&
          <TestChat email_docente={email_docente} />
        }
      </TestContainer>
    </AllContainer>
  );
};

export default TestView;