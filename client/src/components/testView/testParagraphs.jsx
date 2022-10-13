import React from "react";
import styled from "styled-components";

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

const TestParagraphs = () => {
  return (
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
  )
}

export default TestParagraphs;