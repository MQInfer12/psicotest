import React from "react";

const AnswersReports = ({ tableRef, respuestas }) => {
  console.log(tableRef.current);
  return (
    <table style={{display: "none"}} ref={tableRef}>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Test</th>
          <th>Docente</th>
          <th>Estado</th>
          <th>Puntuación</th>
        </tr>
      </thead>
      <tbody>
        {respuestas.map((v, i) => (
          <tr key={i}>
            <th>{i + 1}</th>
            <td>
              <div>
                <p>{v.nombre_user}</p>
                <p>{v.email_user}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{v.nombre_test}</p>
                <p>{v.descripcion}</p>
              </div>
            </td>
            <td>
              <div>
                <p>{v.nombre_docente}</p>
                <p>{v.email_docente}</p>
              </div>
            </td>
            <td>
              <div>
                <p estado={v.estado}>
                  {v.estado == 0
                    ? "Pendiente"
                    : v.estado == 1
                    ? "Recibido"
                    : v.estado == 2
                    ? "Corregido"
                    : v.estado == 3 && "Expiró"}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p>{v.puntuacion}</p>
                <p>/{v.total}</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnswersReports;