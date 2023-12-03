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
import AnswersPDFRenderer from "../components/answers/pdf/answersPDFRenderer";
import { getFullRespuestas } from "../services/respuesta";

const Answers = () => {
  const windowHeight = useWindowHeight(true, true);
  const { user } = useUserContext();
  const [tableRef, setTableRef] = useState(null);
  const [page, setPage] = useState(0);
  const [viewPDF, setViewPDF] = useState(null);
  const [loadViewPDF, setLoadViewPDF] = useState(false);
  const { makeVisibleY } = useOutletContext();

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();

  const { resJson: respuestas, loading } = useGet(`respuesta/user/${user.id}`, {
    alwaysLoading: true
  });

  const { onDownload } = useDownloadExcel({
    filename:"Respuestas",
    sheet:"Respuestas",
    currentTableRef: tableRef?.current
  });

  const [ filtered, setFiltered ] = useState([]);

  const handleViewPDFs = async () => {
    if(viewPDF) {
      setViewPDF(null);
      return;
    }
    setLoadViewPDF(true);
    const res = await getFullRespuestas(
      filtered.map(respuesta => respuesta.id)
    );
    if(res.ok) {
      const json = await res.json();
      setViewPDF(json);
    }
    setLoadViewPDF(false);
  }
  
  useEffect(() => {
    return makeVisibleY();
  }, []);

  return (
    <AnswersContainer height={windowHeight}>
        <ControlsContainer>
          {
            !viewPDF &&
            <>
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
            </>
          }
          <WhiteIconButton minwidth="40px" title="Exportar PDFs" disabled={loading || loadViewPDF} onClick={handleViewPDFs}>
            {viewPDF ? <i className="fa-solid fa-xmark"></i> : <i className="fa-regular fa-file-pdf"></i>}
          </WhiteIconButton>
        </ControlsContainer>
        {
          viewPDF ?
          <AnswersPDFRenderer data={viewPDF} /> :
          <>
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
          </>
        }
    </AnswersContainer>
  );
};

export default Answers;