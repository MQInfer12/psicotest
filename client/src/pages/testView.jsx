import React from "react";
import styled from "styled-components";

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

const TestInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 427px;
  padding: 115px 115px 115px 40px;
  background-color: #FFFFFF;
`;

const TestInfoTitle = styled.p`
  font-size: 12px;
  color: #660BE1;
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const FeatureIndex = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
`;

const FeatureLine = styled.span`
  height: 60px;
  border-left: 1px solid #D9D9D9;
`;

const FeatureTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
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

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Paragraph = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 138.4%;
`;

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
  padding: 47px;
  display: flex;
  gap: 36px;
`;

const PreguntaContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 437px;
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
  height: 100px;
  width: 100%;
  padding: 0px 40px;
  display: flex;
  align-items: center;
  gap: 46px;
  border: 1px solid #D9D9D9;
  border-radius: 10px;
`;

const ReactivoCheck = styled.div`
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

const TestView = () => {
  return (
    <TestViewContainer>
      <InformationContainer>
        <TestInfoContainer>
          <TestInfoTitle>Información Test AMAS-C</TestInfoTitle>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>01</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Mayor eficacia.</FeatureTitle>
              <FeatureDescription>Es muy sencillo, solamente ingresa tu celular y listo.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>02</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Menor tiempo.</FeatureTitle>
              <FeatureDescription>Selecciona el color que más te guste para tu tarjeta, la enviaremos a tu domicilio.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>03</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Mayor control.</FeatureTitle>
              <FeatureDescription>Inicia sesión en la app e ingresa el número de la tarjeta.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>04</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Mayor control.</FeatureTitle>
              <FeatureDescription>Inicia sesión en la app e ingresa el número de la tarjeta.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>05</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Mayor control.</FeatureTitle>
              <FeatureDescription>Inicia sesión en la app e ingresa el número de la tarjeta.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
        </TestInfoContainer>
        <TestTextContainer>
          <TestTitle>Test AMAS-C</TestTitle>
          <ParagraphContainer>
            <Paragraph>
            La AMAS o Escala de ansiedad manifiesta en adultos es un conjunto de tres instrumentos, a saber, el AMAS-A, AMAS-C y AMAS-E, diseñados para medir y evaluar el nivel de ansiedad experimentada por los adultos de manera sencilla y eficaz.
            </Paragraph>
            <Paragraph>
            Cada uno de estos tres instrumentos están diseñados para la evaluación de la ansiedad en grupos demográficos diferentes, sin embargo se asemejan en gran medida unos de otros por el hecho de que comparten muchos de sus reactivos diferenciándose sólo en el nivel de detalle de la información que puede ser obtenida de cada uno según el grupo demográfico al que está destinado.
            </Paragraph>
            <Paragraph>
            La AMAS fue desarrollada por Reynolds, Richmond y Lowe en el año 2003 en los Estados Unidos, a partir de la CMAS-R o Escala de ansiedad manifiesta en niños.
            </Paragraph>
            <Paragraph>
            AMAS-C
            </Paragraph>
            <Paragraph>
            Está orientada hacia la detección y evaluación de la ansiedad en estudiantes universitarios, incluyendo reactivos que se dirigen de manera específica a la ansiedad ante los exámenes. Consta de 49 reactivos y cuatro escalas de ansiedad y una de validez.
            </Paragraph>
            <Paragraph>
            Las subescalas que lo conforman son; la escala inquietud/hipersensibilidad (IHS) con 12 reactivos. La subescala de preocupaciones sociales/estrés (SOC) con 7 reactivos. La subescala de ansiedad fisiológica (FIS) con 36 reactivos. La escala de ansiedad ante los exámenes (Examen) con 15 reactivos. Y la subescala de mentira con 7 reactivos. Además de la escala (TOT) o de ansiedad total.
            </Paragraph>
            <Paragraph>
            APLICACIONES Y LIMITACIONES
            </Paragraph>
            <Paragraph>
            Los instrumentos que componen la AMAS son de gran utilidad para su utilización en la práctica clínica general, ya que puede ayudar al diagnostico de la ansiedad como trastorno o como síntoma de algún otro problema. Puede además ser útil para supervisar los efectos de un tratamiento psicoterapéutico o farmacológico, aplicándose de manera repetida al paciente para ver el grado en que varia su nivel de ansiedad y, en caso de no darse dicha variación, considerar tratamientos alternativos. Además de esto la AMAS y escalas que la conforman tienen una amplia selección de aplicaciones en centros de orientación universitarios, hospicios y centros geriátricos, permitiendo también distinguir entre individuos con niveles normales de estrés y aquellos con estrés clínicamente significativos.
            </Paragraph>
          </ParagraphContainer>
        </TestTextContainer>
      </InformationContainer>
      <TestResolutionContainer>
        <ResolutionTitle>Test AMAS-C</ResolutionTitle>
        <StartText>Comienza tu test</StartText>
        <TestContainer>
          <PreguntasContainer>
            <PreguntaContainer>
              <PreguntaIndex>P1: 1/8</PreguntaIndex>
              <Pregunta>Parecería que los demás hacen las cosas con mayor facilidad que yo</Pregunta>
            </PreguntaContainer>
            <ReactivosContainer>
              <ReactivoContainer>
                <ReactivoCheck></ReactivoCheck>
                <ReactivoTest>Si</ReactivoTest>
              </ReactivoContainer>
              <ReactivoContainer>
                <ReactivoCheck></ReactivoCheck>
                <ReactivoTest>No</ReactivoTest>
              </ReactivoContainer>
            </ReactivosContainer>
          </PreguntasContainer>
          <SliderContainer>
            <ButtonTransparent>
              <IconButton className="fa-solid fa-arrow-left"></IconButton>
              <PButton>Pregunta anterior</PButton>
            </ButtonTransparent>
          </SliderContainer>
        </TestContainer>
      </TestResolutionContainer>
    </TestViewContainer>
  )
}

export default TestView;