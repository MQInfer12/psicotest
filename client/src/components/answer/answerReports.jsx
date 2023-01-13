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
      <table>
        <thead><tr><th style={ThStyle}>Dato</th><th style={ThStyle}>Usuario</th></tr></thead>
        <tbody>
          <tr><td>Test:</td><td>{respuesta.nombre_test}</td></tr>
          <tr><td>Nombre:</td><td>{respuesta.nombre_user}</td></tr>
          <tr><td>Email:</td><td>{respuesta.email_user}</td></tr>
          <tr><td>Edad:</td><td>{respuesta.edad}</td></tr>
          <tr><td>Genero:</td><td>{respuesta.genero?.charAt(0).toUpperCase() + respuesta.genero?.slice(1)}</td></tr>
        </tbody>
      </table>
      <br/>
      <div>
        Totales:
        <table>
          <thead>
            <tr>
              <th style={ThStyle}>Dimensión</th>
              <th style={ThStyle}>Natural</th>
              {
                respuesta.test.escalas.map((v, i) => (
                  <th key={i} style={ThStyle}>{v.descripcion}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              respuesta.test.dimensiones.map((v, i) => (
                <tr key={i}>
                  <td><p>{v.descripcion}</p></td>
                  {
                    v.puntuaciones.map((punt, j) => (
                      <td key={j}><p>{punt}</p></td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <br/>
      {secciones.map((seccion, i) => (
        <div key={i}>
          {seccion.nombre}
          <table>
            <thead>
              <tr>
                <th style={ThStyle}>#</th>
                <th style={ThStyle}>Pregunta</th>
                <th style={ThStyle}>Puntaje</th>
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
                  <td>
                    <p>
                      {respuesta.resultados.find((resultado) => resultado.id_pregunta == pregunta.id)?.asignado}
                    </p>
                  </td>
                  {
                    pregunta.puntuaciones.map((puntuacion, k) => (
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
                    ))
                  }
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