import React from 'react'
import { useNavigate } from 'react-router-dom';
import { WhiteIconButton } from '../../styles/globals/formularios';
import { 
  DivCenter, DivDouble, 
  PLight, PNombre, PPuntaje, PSobre, ResponsiveTr, 
  TableAnswers, TableContainer, ThAnswer, ThNumber, ThNumberal 
} from '../../styles/globals/table';
import { StatusContainer } from '../../styles/pages/answers';
import codeId from '../../utilities/code';
import Cargando from '../globals/cargando';

const AnswersTable = ({ loading, tableHeightRef, respuestas, page, tableRows, rowHeight }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    let stringInd = id.toString();
    let idCode = codeId(stringInd);
    navigate("./" + idCode);
  };

  return (
    <TableContainer scrollableX ref={tableHeightRef}>
      {loading ? (
        <Cargando />
      ) : (
        <TableAnswers>
          <thead>
            <tr>
              <ThNumberal>#</ThNumberal>
              <ThAnswer width="200px">Nombre</ThAnswer>
              <ThAnswer width="240px">Test</ThAnswer>
              <ThAnswer width="200px">Psicólogo</ThAnswer>
              <ThAnswer width="100px">Estado</ThAnswer>
              <ThAnswer width="100px">Puntuación</ThAnswer>
              <ThAnswer width="100px">Controles</ThAnswer>
            </tr>
          </thead>
          <tbody>
            {respuestas
              .filter((v, i) => i >= (page - 1) * tableRows && i < page * tableRows)
              .map((v, i) => (
                <ResponsiveTr rowHeight={rowHeight} key={i}>
                  <ThNumber>{(page - 1) * tableRows + (i + 1)}</ThNumber>
                  <td>
                    <DivDouble>
                      <PNombre>{v.nombre_user}</PNombre>
                      <PLight>{v.email_user}</PLight>
                    </DivDouble>
                  </td>
                  <td>
                    <DivDouble>
                      <PLight>{v.nombre_test}</PLight>
                      <PLight>{v.descripcion}</PLight>
                    </DivDouble>
                  </td>
                  <td>
                    <DivDouble>
                      <PNombre>{v.nombre_docente}</PNombre>
                      <PLight>{v.email_docente}</PLight>
                    </DivDouble>
                  </td>
                  <td>
                    <DivDouble>
                      <StatusContainer estado={v.estado}>
                        {v.estado == 0
                          ? "Pendiente"
                          : v.estado == 1
                          ? "Recibido"
                          : v.estado == 2
                          ? "Corregido"
                          : v.estado == 3 && "Expiró"}
                      </StatusContainer>
                    </DivDouble>
                  </td>
                  <td>
                    <DivDouble>
                      <PPuntaje>{v.puntuacion}</PPuntaje>
                      <PSobre>/{v.total}</PSobre>
                    </DivDouble>
                  </td>
                  <td>
                    <DivCenter>
                      <WhiteIconButton title="Ver respuesta" onClick={() => handleClick(v.id)}>
                        <i className="fa-solid fa-eye"></i>
                      </WhiteIconButton>
                    </DivCenter>
                  </td>
                </ResponsiveTr>
              ))}
          </tbody>
        </TableAnswers>
      )}
    </TableContainer>
  )
}

export default AnswersTable