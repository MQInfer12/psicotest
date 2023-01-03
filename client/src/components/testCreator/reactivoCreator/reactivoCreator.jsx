import React, { useState } from "react";
import { WhiteIconButton } from "../../../styles/globals/formularios";
import { addReactivo } from "../../../services/reactivo";
import { massUpdatePuntuaciones } from "../../../services/puntuacion";
import { ErrorCss } from "../../../styles/globals/formularios";
import Pagination from "../pagination";
import ModalReactivo from "./modalReactivo";
import ReactivoCard from "./reactivoCard";
import { ControlsContainer, TableContainer, TableAnswers, ThNumberal } from "../../../styles/globals/table";
import { useTableHeight } from "../../../hooks/useTableHeight";
import { useModal } from "../../../hooks/useModal";
import { HeadContainer, PSelected, ReactivoCreatorContainer } from "../../../styles/pages/testCreator";
import { useEffect } from "react";
import ReactivoTableBody from "./reactivoTableBody";
import { useTestCreatorContext } from "../../../context/testCreatorContext";

const ReactivoCreator = ({ pageState }) => {
  const { page: reactivosPage, setPage: setReactivosPage } = pageState;
  const [save, setSave] = useState(false);
  const [puntuaciones, setPuntuaciones] = useState([]);

  const { tableHeightRef, tableRows, rowHeight, resizing } = useTableHeight();
  
  const { seccion, updateSeccion } = useTestCreatorContext();

  const handleSave = async () => {
    const res = await massUpdatePuntuaciones(puntuaciones);
    if(res.ok) {
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        newSeccion.puntuaciones = puntuaciones;
        return newSeccion;
      });
      setSave(false);
    }
  }

  useEffect(() => {
    setPuntuaciones(seccion.puntuaciones);
  }, [seccion]);

  const { openModal, closeModal } = useModal(
    "Añadir reactivo",
    <ModalReactivo
      call={addReactivo}
      actualizar={(res) => {
        updateSeccion(seccion => {
          const newSeccion = {...seccion};
          newSeccion.reactivos = [...newSeccion.reactivos, res.data.reactivo];
          newSeccion.puntuaciones = [...newSeccion.puntuaciones, ...res.data.puntuaciones];
          setPuntuaciones(newSeccion.puntuaciones);
          return newSeccion;
        });
        closeModal();
      }}
      funcion="añadir"
      idSeccion={seccion.id}
    />
  );

  return (
    <ReactivoCreatorContainer>
      <ControlsContainer spaceBetween>
        <HeadContainer>
          <WhiteIconButton title="Añadir reactivo" onClick={openModal} disabled={seccion.reactivos.length == 6}><i className="fa-solid fa-plus"></i></WhiteIconButton>
          <PSelected>{seccion.reactivos.length} / 6</PSelected>
        </HeadContainer>
        {
          save &&
          <HeadContainer>
            <ErrorCss>¡Guarda tus cambios!</ErrorCss>
            <WhiteIconButton title="Guardar puntuaciones" onClick={handleSave}><i className="fa-solid fa-plus"></i></WhiteIconButton>
          </HeadContainer>
        }
      </ControlsContainer>
      <TableContainer resizing={resizing} noHide ref={tableHeightRef}>
        <TableAnswers inReactivoCreator>
          <thead>
            <tr>
              <ThNumberal>#</ThNumberal>
              {
                seccion.reactivos.map((v, i) => (
                  <ReactivoCard 
                    key={i} 
                    {...v}
                    setPuntuaciones={setPuntuaciones}
                  />
                ))
              }
            </tr>
          </thead>
          <tbody>
            <ReactivoTableBody 
              reactivosPage={reactivosPage} 
              puntuaciones={puntuaciones}
              setPuntuaciones={setPuntuaciones}
              setSave={setSave}
              rowHeight={rowHeight}
              tableRows={tableRows}
            />
          </tbody>
        </TableAnswers>
      </TableContainer>
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