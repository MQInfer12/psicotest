import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TestFeatures from "../components/testView/testFeatures";
import TestResolution from "../components/testView/testResolution";
import { getIdTest } from "../services/respuesta";
import { getTest } from "../services/test";
import {
  GrayTextLoader,
  PurpleTextLoader,
  TextLoaderContainer,
} from "../styles/globals/loaders";
import decipherId from "../utilities/decipher";
import { useOutletContext } from "react-router-dom";
import TestChat from "../components/testView/testViewChat";

const TestView = () => {
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
    const res = await getTest(id);
    const resJson = await res?.json();
    setTest(resJson[0]);
    setLoading(false);
  };

  const getTestId = async (id) => {
    const res = await getIdTest(id);
    const resJson = await res?.json();
    setEmail_docente(resJson.email_docente);
    if (resJson.estado != 0) {
      setActivateSend(false);
    }
    const restest = await getTest(resJson.id_test);
    const restestJson = await restest?.json();
    setTest(restestJson[0]);
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

  return (
    <TestViewContainer>
      <TestTextContainer>
        <TestTitle>
          {loading ? <PurpleTextLoader width="100px" /> : test.nombre}
        </TestTitle>
        {loading ? (
          <TextLoaderContainer>
            {Array(5)
              .fill("")
              .map((v, i) => (
                <GrayTextLoader key={i} width="500px" fontSize="20px" />
              ))}
          </TextLoaderContainer>
        ) : (
          <Paragraph>{test.descripcion}</Paragraph>
        )}
      </TestTextContainer>
      <TestFeatures idTest={test.id} />
      <TestResolution
        loading={loading}
        idTest={test.id}
        nombreTest={test.nombre}
        activateSend={activateSend}
        idRespuesta={idRespuesta}
        infoSend={
          idTest
            ? "Solo los beneficiarios pueden enviar respuestas."
            : "Ya enviaste este test."
        }
      />
      {
        email_docente &&
        <TestChat email_docente={email_docente} />
      }
    </TestViewContainer>
  );
};

export default TestView;

const TestViewContainer = styled.div`
  min-height: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Paragraph = styled.p`
  max-width: 500px;
  font-size: 20px;
  font-weight: 300;
  line-height: 175%;
  padding: 0 20px;
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
`;
