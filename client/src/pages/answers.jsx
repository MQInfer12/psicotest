import React, { useState } from "react";
import Pagination from "../components/answers/pagination";
import { useNavigate } from "react-router-dom";
import { WhiteIconButton } from "../styles/globals/formularios";
import { useUserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";
import { useDownloadExcel } from "react-export-table-to-excel";
import codeId from "../utilities/code";
import AnswersReports from "../components/answers/answersReports";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { 
  AnswersContainer, ControlsContainer, TableContainer, TableAnswers, 
  ThNumberal, ThAnswer, ThNumber, ResponsiveTr,
  DivDouble, DivCenter,
  PNombre, PLight, PPuntaje, PSobre
} from "../styles/globals/table";
import { useTableHeight } from "../hooks/useTableHeight";
import useGet from "../hooks/useGet";
import { ISearch, SearchDiv, SearchInput, SearchSelect, StatusContainer } from "../styles/pages/answers";

const Answers = () => {
  const windowHeight = useWindowHeight(true, true);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [tableRef, setTableRef] = useState(null);
  const [page, setPage] = useState(0);

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();

  const { resJson: respuestas, loading } = useGet(`respuesta/user/${user.id}`);

  const { onDownload } = useDownloadExcel({
    filename:"Respuestas",
    sheet:"Respuestas",
    currentTableRef: tableRef?.current
  });

  const [select, setSelect] = useState("name");
  const [filter, setFilter] = useState("");

  const handleChooseFilter = async (e) => {
    setFilter(e.target.value);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const searchRespuestas = () => {
    const newRespuestas = [];
    respuestas.forEach(respuesta => {
      if(filter === "") return newRespuestas.push(respuesta);
      if (select === "name") {
        if (respuesta.nombre_user.toLocaleLowerCase().includes(filter.toLowerCase())) {
          return newRespuestas.push(respuesta);
        }
      }
      if (select === "test") {
        if (respuesta.nombre_test.toLocaleLowerCase().includes(filter.toLowerCase())) {
          return newRespuestas.push(respuesta);
        }
      }
      if (select === "professor") {
        if (respuesta.nombre_docente.toLocaleLowerCase().includes(filter.toLowerCase())) {
          return newRespuestas.push(respuesta);
        }
      }
      if (select === "state") {
        if (respuesta.case) {
          if (respuesta.case.toLocaleLowerCase().includes(filter.toLowerCase())) {
            return newRespuestas.push(respuesta);
          }
        }
      }
    });
    return newRespuestas;
  }

  const handleClick = (id) => {
    let stringInd = id.toString();
    let idCode = codeId(stringInd);
    navigate("./" + idCode);
  };

  return (
    <AnswersContainer height={windowHeight}>
      <ControlsContainer>
        <SearchSelect onChange={handleSelect}>
          <option value="name">Nombre</option>
          <option value="test">Test</option>
          <option value="professor">Docente</option>
          <option value="state">Estado</option>
        </SearchSelect>
        <SearchDiv>
          <SearchInput type="text" placeholder="Buscar..." onChange={handleChooseFilter} />
          <ISearch className="fa-solid fa-magnifying-glass"></ISearch>
        </SearchDiv>
        <WhiteIconButton title="Exportar excel" disabled={loading} onClick={onDownload}>
          <i className="fa-regular fa-file-excel"></i>
        </WhiteIconButton>
        <AnswersReports
          respuestas={searchRespuestas()}
          setTableRef={setTableRef}
        />
      </ControlsContainer>
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
                <ThAnswer width="200px">Docente</ThAnswer>
                <ThAnswer width="100px">Estado</ThAnswer>
                <ThAnswer width="100px">Puntuación</ThAnswer>
                <ThAnswer width="100px">Controles</ThAnswer>
              </tr>
            </thead>
            <tbody>
              {searchRespuestas()
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
      <Pagination
        cant={searchRespuestas().length}
        rows={tableRows}
        page={page}
        setPage={setPage}
      />
    </AnswersContainer>
  );
};

export default Answers;