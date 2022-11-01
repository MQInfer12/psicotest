import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import Pagination from "../components/answers/pagination";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton } from "../styles/formularios";
import { getRespuestas, getRespuestasByDocente } from "../services/respuesta";
import { UserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";
import { DownloadTableExcel } from "react-export-table-to-excel";
import codeId from "../utilities/code";
import AnswersReports from "../components/answers/answersReports";

const Answers = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [respuestas, setRespuestas] = useState([]);
  const [page, setPage] = useState(1);

  const llenarRespuestas = async () => {
    const res = await getRespuestas();
    const resJson = await res?.json();
    setRespuestas(resJson);
    setLoading(false);
  };

  const llenarRespuestasPorDocente = async () => {
    const res = await getRespuestasByDocente(user.id);
    const resJson = await res?.json();
    setRespuestas(resJson);
    setLoading(false);
  };

  useEffect(() => {
    if (user.id_rol === 3) {
      llenarRespuestas();
    } else if (user.id_rol === 2) {
      llenarRespuestasPorDocente();
    }
  }, []);

  const [select, setSelect] = useState("name");
  const [filter, setFilter] = useState("");

  const handleChooseFilter = async (e) => {
    setFilter(e.target.value);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const search = (v) => {
    if (filter === "") return v;
    if (select === "name") {
      if (v.nombre_user.toLocaleLowerCase().includes(filter.toLowerCase())) {
        return v;
      }
    }
    if (select === "test") {
      if (v.nombre_test.toLocaleLowerCase().includes(filter.toLowerCase())) {
        return v;
      }
    }
    if (select === "professor") {
      if (v.nombre_docente.toLocaleLowerCase().includes(filter.toLowerCase())) {
        return v;
      }
    }
    if (select === "state") {
      if (v.case) {
        if (v.case.toLocaleLowerCase().includes(filter.toLowerCase())) {
          return v;
        }
      }
    }
  };

  const tableRef = useRef(null);

  const handleClick = (id) => {
    let stringInd = id.toString();
    let idCode = codeId(stringInd);
    idCode = idCode.replaceAll("/", "_");
    navigate("./" + idCode);
  };

  return (
    <AnswersContainer>
      <ControlsContainer>
        <input type="text" onChange={handleChooseFilter} />
        <select onChange={handleSelect}>
          <option value="name">Nombre</option>
          <option value="test">Test</option>
          <option value="professor">Docente</option>
          <option value="state">Estado</option>
        </select>
        <DownloadTableExcel
          filename="respuestas"
          sheet="respuestas"
          currentTableRef={tableRef.current}
        >
          <button> Export excel </button>
        </DownloadTableExcel>
      </ControlsContainer>
      <TableContainer>
        {loading ? (
          <Cargando />
        ) : (
          <>
            <TableAnswers>
              <thead>
                <tr>
                  <ThNumberal>#</ThNumberal>
                  <ThAnswer width="180px">Nombre</ThAnswer>
                  <ThAnswer>Test</ThAnswer>
                  <ThAnswer width="180px">Docente</ThAnswer>
                  <ThAnswer width="100px">Estado</ThAnswer>
                  <ThAnswer width="100px">Puntuación</ThAnswer>
                  <ThAnswer width="120px">Controles</ThAnswer>
                </tr>
              </thead>
              <tbody>
                {respuestas
                  .filter((v, i) => i >= (page - 1) * 9 && i < page * 9)
                  .filter((v) => {
                    const res = search(v);
                    return res;
                  })
                  .map((v, i) => (
                    <tr key={i}>
                      <ThNumber>{(page - 1) * 9 + (i + 1)}</ThNumber>
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
                          <WhiteIconButton onClick={() => handleClick(v.id)}>
                            <i className="fa-solid fa-eye"></i>
                          </WhiteIconButton>
                        </DivCenter>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </TableAnswers>
          </>
        )}
      </TableContainer>

      <AnswersReports
        respuestas={respuestas.filter((v) => {
          const res = search(v);
          return res;
        })}
        tableRef={tableRef}
      />

      <Pagination
        cant={respuestas.length}
        rows="9"
        page={page}
        setPage={setPage}
      />
    </AnswersContainer>
  );
};

export default Answers;

const AnswersContainer = styled.div`
  height: 100%;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #ebf0fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  padding: 0px 11px;
`;

//TABLA
const TableContainer = styled.div`
  height: 100%;
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
    background-color: #ffffff;
    position: relative;
    text-align: center;
  }

  & > tbody > tr:nth-child(2n) {
    background-color: #ebf0fa;
  }
`;

const ThNumberal = styled.th`
  font-size: 11px;
  color: #171c26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

const ThAnswer = styled.th`
  width: ${(props) => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: start;
  color: #464f60;
`;

const DivDouble = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  text-align: start;
`;

const PNombre = styled.p`
  font-size: 14px;
  color: #171c26;
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

const StatusContainer = styled.div`
  width: fit-content;
  border-radius: 10px;
  padding: 1px 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.estado == 0
      ? "#E9EDF5"
      : props.estado == 1
      ? "#F0F1FA"
      : props.estado == 2
      ? "#E1FCEF"
      : props.estado == 3 && "#FAF0F3"};
  color: ${(props) =>
    props.estado == 0
      ? "#5A6376"
      : props.estado == 1
      ? "#4F5AED"
      : props.estado == 2
      ? "#14804A"
      : props.estado == 3 && "#D12953"};
`;

const PPuntaje = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #464f60;
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
  color: #171c26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
`;