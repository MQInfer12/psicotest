import React, { useState } from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../../styles/formularios";
import Cargando from "../../globals/cargando";
import { addReactivo, getReactivosBySeccion } from "../../../services/reactivo";
import { getPuntuacionesByReactivos, massUpdatePuntuaciones } from "../../../services/puntuacion";
import { ErrorCss } from "../../../styles/formularios";
import Modal from "../../globals/modal";
import Pagination from "../pagination";
import ModalReactivo from "./modalReactivo";
import ReactivoCard from "./reactivoCard";
import { 
  ControlsContainer, TableContainer, TableAnswers,
  ThNumberal, ThNumber, ResponsiveTr
} from "../../../styles/table";
import { useTableHeight } from "../../../hooks/useTableHeight";

const ReactivoCreator = ({ idSeccion, reactivos, setReactivos, puntuaciones, setPuntuaciones, preguntas }) => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [reactivosPage, setReactivosPage] = useState(1);
  const [save, setSave] = useState(false);

  const { tableHeightRef, tableRows, rowHeight, resizing } = useTableHeight();

  const llenarReactivos = async () => {
    const res = await getReactivosBySeccion(idSeccion);
    const resJson = await res?.json();
    setReactivos(resJson);

    //BUSCAR PUNTUACIONES POR ID REACTIVOS
    let idReactivos = [];
    resJson.forEach(reactivo => {
      idReactivos.push(reactivo.id);
    });

    const resPunt = await getPuntuacionesByReactivos(idReactivos);
    const resPuntJson = await resPunt?.json();
    setPuntuaciones(resPuntJson);

    //DEJAR DE CARGAR
    setLoading(false);
  }

  const handleChange = (e) => {
    setSave(true);
    const {name, value} = e.target;

    let puntuacion = puntuaciones.find(obj => {
      return obj.id == name
    })
    puntuacion.asignado = Number(value);

    setPuntuaciones(oldPuntuaciones => [...oldPuntuaciones]);
  }

  const handleSave = async () => {
    const res = await massUpdatePuntuaciones(puntuaciones);
    const resJson = await res?.json();
    if(resJson.mensaje == "se guardo correctamente") {
      setSave(false);
    }
  }

  useState(() => {
    llenarReactivos();
  }, []);

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer spaceBetween>
        <HeadContainer>
          <WhiteIconButton title="Añadir reactivo" onClick={() => setShowForm(true)} disabled={reactivos.length == 5}><i className="fa-solid fa-plus"></i></WhiteIconButton>
          <PSelected>{reactivos.length} / 5</PSelected>
        </HeadContainer>
        {
          showForm &&
          <Modal titulo="Añadir reactivo" cerrar={() => setShowForm(false)}>
            <ModalReactivo
              call={addReactivo}
              actualizar={() => {
                llenarReactivos();
                setShowForm(false);
              }}
              funcion="añadir"
              idSeccion={idSeccion}
            />
          </Modal>
        }
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
                reactivos.map((v, i) => (
                  <ReactivoCard 
                    key={i} 
                    {...v}
                    llenarReactivos={llenarReactivos}
                  />
                ))
              }
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
                preguntas.filter((v, i) => i >= (reactivosPage - 1) * tableRows && i < reactivosPage * tableRows).map((v, i) => (
                  <ResponsiveTr rowHeight={rowHeight} key={i}>
                    <ThNumber>{((reactivosPage - 1) * tableRows) + (i + 1)}</ThNumber>
                    {
                      puntuaciones.filter(va => va.id_pregunta == v.id).map((va, j) => (
                        <td key={j}>
                          <InputNumber 
                            name={va.id}
                            type="number"
                            value={va.asignado}
                            onChange={handleChange}
                          />
                        </td>
                      )) 
                    }
                  </ResponsiveTr>
                ))
              )
            }
          </tbody>
        </TableAnswers>
      </TableContainer>
      <Pagination 
        cant={preguntas.length}
        rows={tableRows}
        page={reactivosPage}
        setPage={setReactivosPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default ReactivoCreator;

const PreguntaCreatorContainer = styled.div`
  height: calc(100% - 40px);
  width: 622px;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const HeadContainer = styled.div`
  width: max-content;
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
  height: calc(100vh - 400px);
  width: 622px;
`;

const TdCargando = styled.td`
  background-color: #FFFFFF;
  display: flex;
  width: 100%;
`;

const InputNumber = styled.input`
  border: none;
  background-color: transparent;
  text-align: center;
  width: 40%;
  outline: none;
`;