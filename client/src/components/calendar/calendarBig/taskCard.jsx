import React from 'react'
import { useModal } from '../../../hooks/useModal';
import { updateHorario } from '../../../services/horario';
import { DivTask } from '../../../styles/pages/calendar';
import ModalAceptarCita from '../modalAceptarCita';
import ModalAsignarCita from '../modalAsignarCita';
import ModalCancelarCita from '../modalCancelarCita';
import ModalHorario from '../modalHorario';

const TaskCard = ({
  v, background, textcolor, event, rol, llenarTareas
}) => {
  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    rol != 1 ? "Editar horario" : "Asignar cita",
    rol != 1 ? (
      <ModalHorario 
        funcion="editar"
        call={updateHorario}
        horario={v}
        actualizar={() => {
          llenarTareas();
          closeEdit();
        }}
      />
    ) : (
      <ModalAsignarCita 
        actualizar={() => {
          llenarTareas();
          closeEdit();
        }}
        horario={v}
      />
    )
  )

  const { openModal: openCancel, closeModal: closeCancel } = useModal(
    "Cancelar cita",
    <ModalCancelarCita 
      cita={v}
      actualizar={() => {
        llenarTareas();
        closeCancel();
      }}
    />
  )
  const { openModal: openAccept, closeModal: closeAccept } = useModal(
    "Aceptar cita",
    <ModalAceptarCita 
      horario={v}
      actualizar={() => {
        llenarTareas();
        closeAccept();
      }}
    />
  )

  return (
    <DivTask 
      background={background}
      textcolor={textcolor}
      onClick={() => {
        event === "Libre" ? openEdit() :
        event === "Pendiente" || event === "Cita" ? openCancel() :
        event === "Pendientes" && openAccept()
      }} 
    >
      {event === "Libre" && rol === 1 ? v.nombre + " - " : event + " - "}
      {v.hora_inicio.substring(0, 5)} a {v.hora_final.substring(0, 5)}
    </DivTask>
  )
}

export default TaskCard