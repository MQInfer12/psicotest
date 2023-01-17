import React, { useState } from "react";
import Pagination from "../components/answers/pagination";
import { WhiteIconButton } from "../styles/globals/formularios";
import { useUserContext } from "../context/userContext";
import { useDownloadExcel } from "react-export-table-to-excel";
import AnswersReports from "../components/answers/answersReports";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { AnswersContainer, ControlsContainer } from "../styles/globals/table";
import { useTableHeight } from "../hooks/useTableHeight";
import useGet from "../hooks/useGet";
import AnswersTable from "../components/answers/answersTable";
import AnswersFilter from "../components/answers/answersFilter";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const Answers = () => {
  const windowHeight = useWindowHeight(true, true);
  const { user } = useUserContext();
  const [tableRef, setTableRef] = useState(null);
  const [page, setPage] = useState(0);
  const { makeVisibleY } = useOutletContext();

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();

  const { resJson: respuestas, loading } = useGet(`respuesta/user/${user.id}`);

  const { onDownload } = useDownloadExcel({
    filename:"Respuestas",
    sheet:"Respuestas",
    currentTableRef: tableRef?.current
  });

  const [ filtered, setFiltered ] = useState([]);

  useEffect(() => {
    return makeVisibleY();
  }, []);

  return (
    <AnswersContainer height={windowHeight}>
      <ControlsContainer>
        <AnswersFilter 
          respuestas={respuestas}
          setFiltered={setFiltered}
        />
        <WhiteIconButton minwidth="40px" title="Exportar excel" disabled={loading} onClick={onDownload}>
          <i className="fa-regular fa-file-excel"></i>
        </WhiteIconButton>
        <AnswersReports
          respuestas={filtered}
          setTableRef={setTableRef}
        />
      </ControlsContainer>
      <AnswersTable 
        loading={loading}
        page={page}
        rowHeight={rowHeight}
        respuestas={filtered}
        tableHeightRef={tableHeightRef}
        tableRows={tableRows}
      />
      <Pagination
        cant={filtered.length}
        rows={tableRows}
        page={page}
        setPage={setPage}
      />
    </AnswersContainer>
  );
};

export default Answers;