import React, { useEffect, useState } from "react";
import { WhiteIconButton } from "../../../styles/globals/formularios";
import Cargando from "../../globals/cargando";
import { addReactivo, getReactivosBySeccion } from "../../../services/reactivo";
import { getPuntuacionesByReactivos, massUpdatePuntuaciones } from "../../../services/puntuacion";
import { ErrorCss } from "../../../styles/globals/formularios";
import Pagination from "../pagination";
import ModalReactivo from "./modalReactivo";
import ReactivoCard from "./reactivoCard";
import { 
  ControlsContainer, TableContainer, TableAnswers,
  ThNumberal, ThNumber, ResponsiveTr
} from "../../../styles/globals/table";
import { useTableHeight } from "../../../hooks/useTableHeight";
import { useModal } from "../../../hooks/useModal";
import { HeadContainer, InputNumber, PSelected, ReactivoCreatorContainer, TdCargando, TrCargando } from "../../../styles/pages/testCreator";

const ReactivoCreator = ({ idSeccion, reactivos, setReactivos, puntuaciones, setPuntuaciones, preguntas }) => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    llenarReactivos();
  }, []);

  const { openModal, closeModal } = useModal(
    "Añadir reactivo",
    <ModalReactivo
      call={addReactivo}
      actualizar={() => {
        llenarReactivos();
        closeModal();
      }}
      funcion="añadir"
      idSeccion={idSeccion}
    />
  );

  return (
    <ReactivoCreatorContainer>
      <ControlsContainer spaceBetween>
        <HeadContainer>
          <WhiteIconButton title="Añadir reactivo" onClick={openModal} disabled={reactivos.length == 6}><i className="fa-solid fa-plus"></i></WhiteIconButton>
          <PSelected>{reactivos.length} / 6</PSelected>
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
    </ReactivoCreatorContainer>
  )
}

export default ReactivoCreator;