import React, { useState } from "react";
import styled from "styled-components";
import { DangerIconButton, WhiteIconButton } from "../../../styles/globals/formularios";
import Cargando from "../../globals/cargando";
import { addPregunta,getPreguntasBySeccion, massDestroy } from "../../../services/pregunta";
import { getPuntuacionesByReactivos } from "../../../services/puntuacion";
import Modal from "../../globals/modal";
import ModalPregunta from "./modalPregunta";
import PreguntaCard from "./preguntaCard";
import Pagination from "../pagination";
import SureModal from "../../globals/sureModal";
import { 
  ControlsContainer, TableContainer, TableAnswers,
  ThNumberal, ThAnswer
} from "../../../styles/globals/table";
import { useTableHeight } from "../../../hooks/useTableHeight";

const PreguntaCreator = ({ idSeccion, preguntas, setPreguntas, reactivos, setPuntuaciones }) => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSure, setShowSure] = useState(false);
  const [preguntasPage, setPreguntasPage] = useState(1);
  const [selecteds, setSelecteds] = useState([]);

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();

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

  useState(() => {
    llenarPreguntas();
  }, []);

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer spaceBetween>
        <WhiteIconButton title="Añadir pregunta" onClick={() => setShowForm(true)}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        <DeleteContainer>
          <PSelected>{selecteds.length} seleccionadas</PSelected>
          <DangerIconButton 
            title="Eliminar preguntas seleccionadas" 
            disabled={selecteds.length == 0} 
            onClick={() => setShowSure(true)}
          ><i className="fa-solid fa-trash-can"></i></DangerIconButton>
        </DeleteContainer>
        {
          showForm &&
          <Modal titulo="Añadir pregunta" cerrar={() => setShowForm(false)}>
            <ModalPregunta
              call={addPregunta}
              actualizar={() => {
                llenarPreguntas();
                setShowForm(false);
              }}
              funcion="añadir"
              idSeccion={idSeccion}
            />
          </Modal>
        }
        {
          showSure &&
          <Modal titulo="Eliminar preguntas" cerrar={() => setShowSure(false)}>
            <SureModal
              cerrar={() => setShowSure(false)}
              sure={borrarPreguntas}
              text={"Se eliminarán " + selecteds.length + " preguntas permanentemente"}
            />
          </Modal>
        }
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
                <>
                  {
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
                  }
                </>
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

const PreguntaCreatorContainer = styled.div`
  height: calc(100% - 40px);
  width: 622px;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const DeleteContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PSelected = styled.p`
  height: max-content;
  font-size: 12px;
  color: #464F60;
`;

//TABLA

const TrCargando = styled.tr`
  display: flex;
  width: 622px;
  height: calc(100vh - 400px);
`;

const TdCargando = styled.td`
  background-color: #FFFFFF;
  display: flex;
  width: 622px;
`;