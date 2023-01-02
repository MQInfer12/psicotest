import React from "react";
import { DangerIconButton, WhiteIconButton } from "../../../styles/globals/formularios";
import ModalReactivo from "./modalReactivo";
import { deleteReactivo, updateReactivo } from "../../../services/reactivo";
import SureModal from "../../globals/sureModal";
import { useModal } from "../../../hooks/useModal";
import { DivReactivoButtonsTd, PText, ThReactivo } from "../../../styles/pages/testCreator";
import ModalPuntuacion from "./modalPuntuacion";
import { useTestCreatorContext } from "../../../context/testCreatorContext";

const ReactivoCard = (props) => {
  const { setSecciones, seccionActual } = useTestCreatorContext();

  const borrarReactivo = async () => {
    const res = await deleteReactivo(props.id);
    if(res.ok) {
      setSecciones(old => {
        return old.map((v, i) => {
          if(i === seccionActual) {
            const newReactivos = v.reactivos.filter((reactivo) => reactivo.id != props.id);
            v.reactivos = newReactivos;
            const newPuntuaciones = v.puntuaciones.filter(puntuacion => puntuacion.id_reactivo != props.id);
            v.puntuaciones = newPuntuaciones;
            props.setPuntuaciones(newPuntuaciones);
          }
          return v;
        })
      });
      console.log("Se borro correctamente");
    }
  }

  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    "Editar reactivo",
    <ModalReactivo 
      call={updateReactivo}
      actualizar={(res) => {
        setSecciones(old => {
          return old.map((v, i) => {
            if(i === seccionActual) {
              const newReactivos = v.reactivos.map((reactivo) => {
                if(reactivo.id === props.id) {
                  return res.data;
                }
                return reactivo;
              });
              v.reactivos = newReactivos;
            }
            return v;
          })
        });
        closeEdit();
      }}
      funcion="editar"
      reactivo={props}
      idSeccion={props.id_seccion}
    />
  )

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar reactivo",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarReactivo}
      text="Se eliminará el reactivo permanentemente"
    />
  )

  const { openModal: openPredeterminado, closeModal: closePredeterminado } = useModal(
    "Establecer puntuación",
    <ModalPuntuacion 
      actualizar={(res) => {
        setSecciones(old => {
          return old.map((v, i) => {
            if(i === seccionActual) {
              v.reactivos.find(reactivo => reactivo.id === props.id).predeterminado = Number(res.data);
              const newPuntuaciones = v.puntuaciones.map(puntuacion => {
                if(puntuacion.id_reactivo === props.id) {
                  puntuacion.asignado = Number(res.data);
                }
                return puntuacion;
              });
              v.puntuaciones = newPuntuaciones;
            }
            return v;
          })
        });
        closePredeterminado();
      }}
      reactivo={props}
    />
  )

  return (
    <ThReactivo>
      <PText>
        {props.descripcion}
      </PText>
      <DivReactivoButtonsTd>
        <WhiteIconButton title="Editar reactivo" onClick={openEdit}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
        <WhiteIconButton title="Establecer puntuación de la columna" onClick={openPredeterminado}><i className="fa-solid fa-marker"></i></WhiteIconButton>
        <DangerIconButton title="Eliminar reactivo" onClick={openDelete}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
      </DivReactivoButtonsTd>
    </ThReactivo>
  )
}

export default ReactivoCard;