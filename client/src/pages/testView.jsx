import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TestFeatures from "../components/testView/testFeatures";
import TestParagraphs from "../components/testView/testParagraphs";
import TestResolution from "../components/testView/testResolution";
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
  const [test, setTest] = useState([]);
  const activateSend = idTest? false : true;

  const llenarTest = async () => {
    const res = await getTest(idTest);
    const resJson = await res?.json();
    setTest(resJson[0]);
  }

  useEffect(() => {
    llenarTest();
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
      <TestResolution activateSend={activateSend} idTest={idTest} nombreTest={test.nombre} />
    </TestViewContainer>
  )
}

export default TestView;