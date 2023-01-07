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
  const { updateSeccion, setDimensiones } = useTestCreatorContext();

  const borrarReactivo = async () => {
    const res = await deleteReactivo(props.id);
    if(res.ok) {
      const resJson = await res?.json();
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        console.log(newSeccion.reactivos, props.id);
        newSeccion.reactivos = seccion.reactivos.filter((reactivo) => reactivo.id != props.id);
        newSeccion.puntuaciones = seccion.puntuaciones.filter(puntuacion => puntuacion.id_reactivo != props.id);
        props.setPuntuaciones(newSeccion.puntuaciones);
        return newSeccion;
      });
      setDimensiones(old => {
        return old.map(dimension => {
          const resDimension = resJson.data.find(dim => dim.id === dimension.id);
          if(resDimension) {
            dimension.escalas[0].valores = resDimension.valores;
          }
          return dimension;
        });
      });
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
          seccion.reactivos.find(reactivo => reactivo.id === props.id).predeterminado = Number(res.data.predeterminado);
          const newPuntuaciones = seccion.puntuaciones.map(puntuacion => {
            if(puntuacion.id_reactivo === props.id) {
              puntuacion.asignado = Number(res.data.predeterminado);
            }
            return puntuacion;
          });
          seccion.puntuaciones = newPuntuaciones;
          return seccion;
        });
        setDimensiones(old => {
          return old.map(dimension => {
            const resDimension = res.data.valores.find(dim => dim.id === dimension.id);
            if(resDimension) {
              dimension.escalas[0].valores = resDimension.valores;
            }
            return dimension;
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