import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TestFeatures from "../components/testView/testFeatures";
import TestParagraphs from "../components/testView/testParagraphs";
import TestResolution from "../components/testView/testResolution";
import { getIdTest } from "../services/respuesta";
import { getTest } from "../services/test";

const TestViewContainer = styled.div`
  min-height: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const InformationContainer = styled.div`
  display: flex;
`;

const TestTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 65px;
  padding: 20px 40px 20px 48px;
`;

const TestTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
`;

const TestView = () => {
  const { idTest } = useParams();
  const { idRespuesta } = useParams();
  
  const [test, setTest] = useState([]);
  const [activateSend, setActivateSend] = useState(idRespuesta? true : false);

  const llenarTest = async () => {
    const res = await getTest(idTest);
    const resJson = await res?.json();
    setTest(resJson[0]);
  }

  const getTestId = async () => {
    const res = await getIdTest(idRespuesta);
    const resJson = await res?.json();
    if(resJson.estado != 0) {
      setActivateSend(false);
    }
    const restest = await getTest(resJson.id_test);
    const restestJson = await restest?.json();
    setTest(restestJson[0]);
  }

  useEffect(() => {
    if(idTest) {
      llenarTest();
    }
    if(idRespuesta) {
      getTestId();
    }
  }, []);

  return (
    <TestViewContainer>
      <InformationContainer>
        <TestFeatures test={test} />
        <TestTextContainer>
          <TestTitle>Test {test.nombre}</TestTitle>
          <TestParagraphs />
        </TestTextContainer>
      </InformationContainer>
      <TestResolution 
        idTest={test.id} 
        nombreTest={test.nombre} 
        activateSend={activateSend} 
        setActivateSend={setActivateSend}
        infoSend={idTest? "Solo los beneficiarios pueden enviar respuestas." : "Ya enviaste este test."}
      />
    </TestViewContainer>
  )
}

export default TestView;