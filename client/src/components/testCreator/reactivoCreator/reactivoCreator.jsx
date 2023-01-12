import React, { useState } from "react";
import Pagination from "../pagination";
import { useTableHeight } from "../../../hooks/useTableHeight";
import { ReactivoCreatorContainer } from "../../../styles/pages/testCreator";
import { useEffect } from "react";
import { useTestCreatorContext } from "../../../context/testCreatorContext";
import ReactivoControls from "./reactivoControls";
import ReactivoTable from "./reactivoTable";

const ReactivoCreator = ({ pageState }) => {
  const { page: reactivosPage, setPage: setReactivosPage } = pageState;
  const [save, setSave] = useState(false);
  const [puntuaciones, setPuntuaciones] = useState([]);

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();
  
  const { seccion } = useTestCreatorContext();

  useEffect(() => {
    setPuntuaciones(seccion.puntuaciones);
  }, [seccion]);

  return (
    <ReactivoCreatorContainer>
      <ReactivoControls 
        save={save} 
        setSave={setSave} 
        puntuaciones={puntuaciones} 
        setPuntuaciones={setPuntuaciones} 
      />
      <ReactivoTable 
        puntuaciones={puntuaciones}
        setPuntuaciones={setPuntuaciones}
        reactivosPage={reactivosPage}
        setSave={setSave}
        tableHeightRef={tableHeightRef}
        tableRows={tableRows}
        rowHeight={rowHeight}
      />
      <Pagination
        cant={seccion.preguntas.length}
        rows={tableRows}
        page={reactivosPage}
        setPage={setReactivosPage}
      />
    </ReactivoCreatorContainer>
  )
}

export default ReactivoCreator;