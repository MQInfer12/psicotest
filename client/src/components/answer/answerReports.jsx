import React, { useEffect, useRef } from 'react';

const AnswerReports = ({ secciones, respuesta, setTableRef }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    setTableRef(tableRef);
  }, [])

  const ThStyle = {
    backgroundColor: "#ebf0fa",
    color: "#464f60"
  }

  return (
    <div style={{display: "none"}} ref={tableRef}>
      <div>
        Test:<br/> {respuesta.nombre_test}<br/>
        Nombre:<br/> {respuesta.nombre_user}<br/>
        Email:<br/> {respuesta.email_user}<br/>
        Edad:<br/> {respuesta.edad}<br/>
        Genero:<br/> {respuesta.genero?.charAt(0).toUpperCase() + respuesta.genero?.slice(1)}<br/>
      </div>
      <br/>
      {secciones.map((seccion, i) => (
        <div key={i}>
          Sección {i + 1}
          <table>
            <thead>
              <tr>
                <th style={ThStyle}>#</th>
                <th style={ThStyle}>Pregunta</th>
                {
                  /* FIXME: PUNTUACIONES EN MULTIMARCADO */
                  !seccion.multimarcado &&
                  <th style={ThStyle}>Puntaje</th>
                }
                {seccion?.reactivos.map((reactivo, j) => (
                  <th style={ThStyle} key={j}>
                    {reactivo.descripcion}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seccion?.preguntas.map((pregunta, j) => (
                <tr key={j}>
                  <th>{j + 1}</th>
                  <td style={{width: "300px"}}>
                    <p>{pregunta.descripcion}</p>
                  </td>
                  {
                    /* FIXME: PUNTUACIONES EN MULTIMARCADO */
                    !seccion.multimarcado &&
                    <td>
                      {respuesta.resultados.filter(
                        (resultado) =>
                          resultado.puntuacion[0].id_pregunta == pregunta.id
                      ).map((puntaje, k) => (
                        <p key={k}>
                          {puntaje.puntuacion[0].asignado}
                        </p>
                      ))}
                    </td>
                  }
                  {pregunta.puntuaciones.map((puntuacion, k) => (
                    <td key={k}>
                      <p style={{
                        backgroundColor: respuesta.resultados.find(resultado =>
                          puntuacion.id == resultado.id_puntuacion
                        ) ? "#d7dbfd" : "" 
                      }}>
                        {respuesta.resultados.find(resultado =>
                            puntuacion.id == resultado.id_puntuacion
                        ) ? 1 : 0}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
        </div>
      ))}
    </div>
  )
}

export default AnswerReports;