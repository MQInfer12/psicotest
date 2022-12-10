import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TestFeatures from "../components/testView/testFeatures";
import TestResolution from "../components/testView/testResolution";
import { getIdTest } from "../services/respuesta";
import { getFullTest } from "../services/test";
import decipherId from "../utilities/decipher";
import { useOutletContext } from "react-router-dom";
import TestChat from "../components/testView/testViewChat";
import Cargando from "../components/globals/cargando";
import { useWindowHeight } from "../hooks/useWindowHeight";

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

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  min-height: ${props => props.height};
`;

const Paragraph = styled.p`
  max-width: 500px;
  font-size: 20px;
  font-weight: 300;
  line-height: 175%;
  padding: 0 20px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const TestTextContainer = styled.div`
  width: 100%;
  text-align: justify;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const TestTitle = styled.h2`
  height: 30px;
  gap: 4px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #660be1;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const TestContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  padding: 40px;
  gap: 40px;

  @media (max-width: 500px) {
    padding: 40px 20px;
  }
`;