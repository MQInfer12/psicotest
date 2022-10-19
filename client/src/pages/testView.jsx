import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TestFeatures from "../components/testView/testFeatures";
import TestResolution from "../components/testView/testResolution";
import { getIdTest } from "../services/respuesta";
import { getTest } from "../services/test";
import { GrayTextLoader, PurpleTextLoader, TextLoaderContainer } from "../styles/loaders";

const TestViewContainer = styled.div`
  min-height: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Paragraph = styled.p`
  width: 500px;
  font-size: 20px;
  font-weight: 300;
  line-height: 138.4%;
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
  color: #660BE1;
`;

const TestView = () => {
  const { idTest } = useParams();
  const { idRespuesta } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState([]);
  const [activateSend, setActivateSend] = useState(idRespuesta? true : false);

  const llenarTest = async () => {
    const res = await getTest(idTest);
    const resJson = await res?.json();
    setTest(resJson[0]);
    setLoading(false);
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
      <TestTextContainer>
        <TestTitle>
          {
            loading ? 
            <PurpleTextLoader width="100px"/> :
            test.nombre
          }
        </TestTitle>
        {
          loading ?
          <TextLoaderContainer>
            <GrayTextLoader width="500px" fontSize="20px" />
            <GrayTextLoader width="500px" fontSize="20px" />
            <GrayTextLoader width="500px" fontSize="20px" />
            <GrayTextLoader width="500px" fontSize="20px" />
            <GrayTextLoader width="500px" fontSize="20px" />
          </TextLoaderContainer> :
          <Paragraph>{test.descripcion}</Paragraph>
        }
      </TestTextContainer>
      <TestFeatures idTest={test.id} />
      <TestResolution 
        loading={loading}
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