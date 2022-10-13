import React, { useEffect , useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getFullTest } from "../../services/test";
import { UserContext } from "../../context/userContext";
import { addRespuesta } from "../../services/respuesta";

const TestResolutionContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 110px 65px 70px 65px;
`;

const ResolutionTitle = styled.h1`
  font-size: 60px;
  font-weight: 600;
`;

const StartText = styled.h4`
  font-size: 20px;
  font-weight: 400;
`;

const TestContainer = styled.div`
  margin-top: 48px;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 15px;
  color: #FFFFFF;
`;

const PreguntasContainer = styled.div`
  height: 471px;
  display: flex;
  overflow: hidden;
`;

const UnaPreguntaContainer = styled.div`
  transform: translateX(${props => props.translate * -100}%);
  min-width: 100%;
  padding: 47px;
  gap: 36px;
  display: flex;
  transition: all 1s;
`;

const PreguntaContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  gap: 30px;
`;

const PreguntaIndex = styled.h2`
  font-weight: 600;
  font-size: 32px;
`;

const Pregunta = styled.h3`
  font-weight: 600;
  font-size: 24px;
`;

const ReactivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const ReactivoContainer = styled.div`
  height: 75px;
  width: 100%;
  padding: 0px 40px;
  display: flex;
  align-items: center;
  gap: 30px;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
`;

const ReactivoCheck = styled.input`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  border: 2px solid #D9D9D9;
  cursor: pointer;
`;

const ReactivoTest = styled.p`
  font-weight: 500;
  font-size: 24px;
`;

const SliderContainer = styled.div`
  height: 104px;
  display: flex;
  align-items: center;
  padding: 0px 40px;
  justify-content: space-between;
  border-top: 1px solid #D9D9D9;
`;

const ButtonTransparent = styled.div`
  background-color: transparent;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
  width: 280px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  cursor: pointer;
`;

const IconButton = styled.div`
  font-size: 18px;
  color: #D9D9D9;
`;

const PButton = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #D9D9D9;
`;

const TestResolution = ({ idTest, nombreTest }) => {
  const { user } = useContext(UserContext);
  const [secciones, setSecciones] = useState([]);
  const [preguntasTotales, setPreguntasTotales] = useState(0);
  const [indexPregunta, setIndexPregunta] = useState(0);
  const [resultados, setResultados] = useState({});

  let cont = 0;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResultados({
      ...resultados,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    const form = {
      id_test: idTest,
      email_user: user.email,
      id_resultados: resultados
    }

    const res = await addRespuesta(form);
    const resJson = await res?.json();
    console.log(JSON.stringify(form));
    console.log(resJson);
  }

  const llenarTestEntero = async () => {
    const res = await getFullTest(idTest);
    const resJson = await res?.json();
    setSecciones(resJson.secciones);

    let contPreguntas = 0;
    resJson.secciones.forEach(seccion => {
      contPreguntas += seccion.preguntas.length;
    });
    setPreguntasTotales(contPreguntas);
  }

  useEffect(() => {
    llenarTestEntero();
  }, []);

  return (
    <TestResolutionContainer>
      <ResolutionTitle>{nombreTest}</ResolutionTitle>
      <StartText>Comienza tu test</StartText>
      <TestContainer>

        <PreguntasContainer>
          {
            secciones.map((seccion, i) => (
              seccion.preguntas.map((pregunta, j) => {
                cont++;
                return (
                  <UnaPreguntaContainer key={j} translate={indexPregunta}>
                    <PreguntaContainer>
                      <PreguntaIndex>P{cont}: {cont}/{preguntasTotales}</PreguntaIndex>
                      <Pregunta>{pregunta.descripcion}</Pregunta>
                    </PreguntaContainer>
                    <ReactivosContainer>
                      {
                        seccion.reactivos.map((reactivo, k) => (
                          <ReactivoContainer key={k}>
                            <ReactivoCheck
                              type="radio"
                              name={pregunta.id}
                              onChange={handleChange}
                              value={pregunta.puntuaciones.filter(puntuacion => puntuacion.id_reactivo == reactivo.id).map(puntuacion => puntuacion.id)}
                            /> 
                            <ReactivoTest>{reactivo.descripcion}</ReactivoTest>
                          </ReactivoContainer>
                        ))
                      }
                    </ReactivosContainer>
                  </UnaPreguntaContainer>
                )
              })
            ))
          }
        </PreguntasContainer>
        
        <SliderContainer>
          <ButtonTransparent 
            onClick={() => {
              if(indexPregunta != 0) {
                setIndexPregunta(indexPregunta - 1)
              }
            }}
          >
            <IconButton className="fa-solid fa-arrow-left"></IconButton>
            <PButton>Pregunta anterior</PButton>
          </ButtonTransparent>
          {
            indexPregunta == preguntasTotales - 1 ? (
              <ButtonTransparent onClick={ handleSubmit }>
                <PButton>Enviar Test</PButton>
                <IconButton className="fa-solid fa-share-from-square"></IconButton>
              </ButtonTransparent>
            ) : (
              <ButtonTransparent onClick={() => setIndexPregunta(indexPregunta + 1)}>
                <PButton>Pregunta siguiente</PButton>
                <IconButton className="fa-solid fa-arrow-right"></IconButton>
              </ButtonTransparent>
            )
          }
        </SliderContainer>
      </TestContainer>
    </TestResolutionContainer>
  )
}

export default TestResolution;