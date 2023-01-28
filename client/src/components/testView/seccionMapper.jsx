import React from 'react'
import PreguntaCard from './preguntaCard';

const SeccionMapper = ({ secciones, cont, preguntas, indexPregunta, preguntasTotales, setResultados }) => {
  return secciones.map((seccion, i) => (
    seccion.preguntas.map((pregunta, j) => {
      cont++;
      preguntas.push({seccion, pregunta});
      return (
        <PreguntaCard key={j}
          cont={cont}
          indexPregunta={indexPregunta}
          pregunta={pregunta}
          preguntasTotales={preguntasTotales}
          seccion={seccion}
          setResultados={setResultados}
        />
      );
    })
  ))
}

export default SeccionMapper