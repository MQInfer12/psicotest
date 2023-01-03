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
  const { updateSeccion } = useTestCreatorContext();

  const borrarReactivo = async () => {
    const res = await deleteReactivo(props.id);
    if(res.ok) {
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        console.log(newSeccion.reactivos, props.id);
        newSeccion.reactivos = seccion.reactivos.filter((reactivo) => reactivo.id != props.id);
        newSeccion.puntuaciones = seccion.puntuaciones.filter(puntuacion => puntuacion.id_reactivo != props.id);
        props.setPuntuaciones(newSeccion.puntuaciones);
        return newSeccion;
      })
      console.log("Se borro correctamente");
    }
  }

  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    "Editar reactivo",
    <ModalReactivo 
      call={updateReactivo}
      actualizar={res => {
        updateSeccion(seccion => {
          seccion.reactivos = seccion.reactivos.map((reactivo) => {
            if(reactivo.id === props.id) {
              return res.data;
            }
            return reactivo;
          });
          return seccion;
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
        updateSeccion(seccion => {
          seccion.reactivos.find(reactivo => reactivo.id === props.id).predeterminado = Number(res.data);
          const newPuntuaciones = seccion.puntuaciones.map(puntuacion => {
            if(puntuacion.id_reactivo === props.id) {
              puntuacion.asignado = Number(res.data);
            }
            return puntuacion;
          });
          seccion.puntuaciones = newPuntuaciones;
          return seccion;
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