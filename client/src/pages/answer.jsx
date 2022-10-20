import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const AnswerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AnswersContainer = styled.div`
  height: 100%;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0px 11px;
`;

//TABLA
const TableContainer = styled.div`
  overflow: hidden;
`;

const TableAnswers = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  & > thead {
    height: 40px;
  }

  & > tbody > tr {
    max-width: 622px;
    height: 64px;
    background-color: #FFFFFF;
    position: relative;
    text-align: center;
  }

  & > tbody > tr:nth-child(2n) {
    background-color: #EBF0FA;
  }
`;

const ThNumberal = styled.th`
  font-size: 11px;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

const ThAnswer = styled.th`
  width: ${props => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464F60;
`;

const ThReactivo = styled.th`
  width: ${props => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: #464F60;
`;

const DivDouble = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: start;
`;

const PNombre = styled.p`
  font-size: 14px;
  color: #171C26;
  font-weight: 500;
`;

const PLight = styled.p`
  color: #687182;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PLightDouble = styled.p`
  padding-right: 10px;
  color: #687182;
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
`;

const StatusContainer = styled.div`
  width: fit-content;
  border-radius: 10px;
  padding: 1px 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.estado == 0? "#E9EDF5" :
                               props.estado == 1? "#F0F1FA" :
                               props.estado == 2? "#E1FCEF" :
                               props.estado == 3 && "#FAF0F3"};
  color: ${props => props.estado == 0? "#5A6376" :
                    props.estado == 1? "#4F5AED" :
                    props.estado == 2? "#14804A" :
                    props.estado == 3 && "#D12953"};
`;

const PPuntaje = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #464F60;
  width: 100%;
  text-align: end;
`;

const PSobre = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #687182;
  width: 100%;
  text-align: end;
`;

const DivCenter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThNumber = styled.th`
  font-size: 14px;
  font-weight: 500;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;

const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
`;

const Answer = () => {
  const { idRespuesta } = useParams();

  return (
    <AnswerPage>
      <TitleSeccion>Sección 1</TitleSeccion>
      <AnswersContainer>
        <TableContainer>
          <TableAnswers>
            <thead>
              <tr>
                <ThNumberal>#</ThNumberal>
                <ThAnswer>Pregunta</ThAnswer>
                <ThReactivo width="100px">Puntaje</ThReactivo>
                <ThReactivo width="100px">No me identifica</ThReactivo>
                <ThReactivo width="100px">Casi me identifica</ThReactivo>
                <ThReactivo width="100px">Me identifica un poco</ThReactivo>
                <ThReactivo width="100px">Me identifica mucho</ThReactivo>
              </tr>
            </thead>
            <tbody>
              <tr>
                <ThNumber>1</ThNumber>
                <td>
                  <DivDouble>
                    <PLightDouble>
                      Son leales y fiables cumplidores, y durante años pueden permanecer en la misma compañía, 
                      donde se les valora por la consistencia en su trabajo y por la minuciosidad con que completan sus tareas.
                    </PLightDouble>
                  </DivDouble>
                </td>
                <td>
                  <PNombre>5</PNombre>
                </td>
                <td>
                  <input type="radio" name="1" disabled />
                </td>
                <td>
                  <input type="radio" name="1" disabled />
                </td>
                <td>
                  <input  type="radio" name="1" disabled />
                </td>
                <td>
                  <input type="radio" name="1" disabled defaultChecked />
                </td>
              </tr>
            </tbody>
          </TableAnswers>
        </TableContainer>
      </AnswersContainer>

      <TitleSeccion>Sección 2</TitleSeccion>
      <AnswersContainer>
        <TableContainer>
          <TableAnswers>
            <thead>
              <tr>
                <ThNumberal>#</ThNumberal>
                <ThAnswer>Pregunta</ThAnswer>
                <ThReactivo width="100px">Puntaje</ThReactivo>
                <ThReactivo width="100px">Si</ThReactivo>
                <ThReactivo width="100px">No</ThReactivo>
              </tr>
            </thead>
            <tbody>
              <tr>
                <ThNumber>1</ThNumber>
                <td>
                  <DivDouble>
                    <PLightDouble>
                      Destaco en que mantengo las cosas organizadas.
                    </PLightDouble>
                  </DivDouble>
                </td>
                <td>
                  <PNombre>1</PNombre>
                </td>
                <td>
                  <input type="radio" name="1" />
                </td>
                <td>
                  <input type="radio" name="1" />
                </td>
              </tr>
              <tr>
                <ThNumber>2</ThNumber>
                <td>
                  <DivDouble>
                    <PLightDouble>
                      Me gusta dedicarme y trabajar en los detalles.
                    </PLightDouble>
                  </DivDouble>
                </td>
                <td>
                  <PNombre>0</PNombre>
                </td>
                <td>
                  <input type="radio" name="1" />
                </td>
                <td>
                  <input type="radio" name="1" />
                </td>
              </tr>
            </tbody>
          </TableAnswers>
        </TableContainer>
      </AnswersContainer>
    </AnswerPage>
  )
}

export default Answer;