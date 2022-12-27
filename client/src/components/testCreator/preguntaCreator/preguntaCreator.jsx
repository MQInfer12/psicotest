import React, { useEffect, useState } from "react";
import { DangerIconButton, WhiteIconButton } from "../../../styles/globals/formularios";
import Cargando from "../../globals/cargando";
import { addPregunta,getPreguntasBySeccion, massDestroy } from "../../../services/pregunta";
import { getPuntuacionesByReactivos } from "../../../services/puntuacion";
import ModalPregunta from "./modalPregunta";
import PreguntaCard from "./preguntaCard";
import Pagination from "../pagination";
import SureModal from "../../globals/sureModal";
import { 
  ControlsContainer, TableContainer, TableAnswers,
  ThNumberal, ThAnswer
} from "../../../styles/globals/table";
import { useTableHeight } from "../../../hooks/useTableHeight";
import { useModal } from "../../../hooks/useModal";
import { DeleteContainer, PreguntaCreatorContainer, PSelected, TdCargando, TrCargando } from "../../../styles/pages/testCreator";

const PreguntaCreator = ({ idSeccion, preguntas, setPreguntas, reactivos, setPuntuaciones }) => {
  const [loading, setLoading] = useState(true);
  const [preguntasPage, setPreguntasPage] = useState(1);
  const [selecteds, setSelecteds] = useState([]);

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();

  //TODO: Cambiar por un useGet
  const llenarPreguntas = async () => {
    const res = await getPreguntasBySeccion(idSeccion);
    const resJson = await res?.json();
    setPreguntas(resJson);

    //BUSCAR PUNTUACIONES POR ID REACTIVOS
    let idReactivos = [];
    reactivos.forEach(reactivo => {
      idReactivos.push(reactivo.id);
    });

    const resPunt = await getPuntuacionesByReactivos(idReactivos);
    const resPuntJson = await resPunt?.json();
    setPuntuaciones(resPuntJson);

    //DEJAR DE CARGAR
    setLoading(false);
  }

  const borrarPreguntas = async () => {
    const res = await massDestroy(selecteds);
    const resJson = await res?.json();
    if(resJson.mensaje = "se borro correctamente") {
      console.log("Se borraron las preguntas");
      llenarPreguntas();
      setSelecteds([]);
    }
  }

  useEffect(() => {
    llenarPreguntas();
  }, []);

  const { openModal: openAdd, closeModal: closeAdd } = useModal(
    "Añadir pregunta",
    <ModalPregunta
      call={addPregunta}
      actualizar={() => {
        llenarPreguntas();
        closeAdd();
      }}
      funcion="añadir"
      idSeccion={idSeccion}
    />
  )
  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar preguntas",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarPreguntas}
      text={"Se eliminarán " + selecteds.length + " preguntas permanentemente"}
    />
  )

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer spaceBetween>
        <WhiteIconButton title="Añadir pregunta" onClick={openAdd}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        <DeleteContainer>
          <PSelected>{selecteds.length} seleccionadas</PSelected>
          <DangerIconButton 
            title="Eliminar preguntas seleccionadas" 
            disabled={selecteds.length == 0} 
            onClick={openDelete}
          ><i className="fa-solid fa-trash-can"></i></DangerIconButton>
        </DeleteContainer>
      </ControlsContainer>
      <TableContainer hideX ref={tableHeightRef}>
        <TableAnswers>
          <thead>
            <tr>
              <ThNumberal>#</ThNumberal>
              <ThAnswer>PREGUNTA</ThAnswer>
            </tr>
          </thead>
          <tbody>
            {
              loading? (
                <TrCargando>
                  <TdCargando>
                    <Cargando />
                  </TdCargando>
                </TrCargando>
              ) : (
                preguntas.filter((v, i) => i >= (preguntasPage - 1) * tableRows && i < preguntasPage * tableRows).map((v, i) => (
                  <PreguntaCard 
                    key={i} 
                    {...v} 
                    index={((preguntasPage - 1) * tableRows) + (i + 1)} 
                    llenarPreguntas={llenarPreguntas}
                    selecteds={selecteds}
                    setSelecteds={setSelecteds}
                    rowHeight={rowHeight}
                  />
                ))
              )
            }
          </tbody>
        </TableAnswers>
      </TableContainer>
      <Pagination 
        cant={preguntas.length}
        rows={tableRows}
        page={preguntasPage}
        setPage={setPreguntasPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default PreguntaCreator;