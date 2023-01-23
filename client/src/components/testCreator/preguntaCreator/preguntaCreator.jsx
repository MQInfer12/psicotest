import React, { useState } from "react";
import Pagination from "../pagination";
import { useTableHeight } from "../../../hooks/useTableHeight";
import { PreguntaCreatorContainer } from "../../../styles/pages/testCreator";
import { useTestCreatorContext } from "../../../context/testCreatorContext";
import PreguntaControls from "./preguntaControls";
import PreguntaTable from "./preguntaTable";

const PreguntaCreator = ({ pageState }) => {
  const { seccion } = useTestCreatorContext();
  const [ selecteds, setSelecteds ] = useState([]);
  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();
  const { page: preguntasPage, setPage: setPreguntasPage } = pageState;

  return (
    <PreguntaCreatorContainer>
      <PreguntaControls 
        selecteds={selecteds} 
        setSelecteds={setSelecteds} 
        tableRows={tableRows}
        setPage={setPreguntasPage}
      />
      <PreguntaTable 
        selecteds={selecteds}
        setSelecteds={setSelecteds}
        preguntasPage={preguntasPage}
        tableHeightRef={tableHeightRef}
        tableRows={tableRows}
        rowHeight={rowHeight}
      />
      <Pagination
        cant={seccion.preguntas.length}
        rows={tableRows}
        page={preguntasPage}
        setPage={setPreguntasPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default PreguntaCreator;