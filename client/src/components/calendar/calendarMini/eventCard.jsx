import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { updateHorario } from '../../../services/horario';
import { EventCardContainer, EventH4, EventPoint, EventText } from '../../../styles/pages/calendar';
import ModalAceptarCita from '../modalAceptarCita';
import ModalAsignarCita from '../modalAsignarCita';
import ModalCancelarCita from '../modalCancelarCita';
import ModalHorario from '../modalHorario';

const EventCard = ({
  v, color, event, rol,
  llenarHorarios, llenarCitasDisponibles, llenarCitasDocente, llenarCitasPorUsuario,
}) => {
  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    rol != 1 ? "Editar horario" : "Asignar cita",
    rol != 1 ? (
      <ModalHorario 
        funcion="editar"
        call={updateHorario}
        horario={v}
        actualizar={() => {
          llenarHorarios();
          closeEdit();
        }}
      />
    ) : (
      <ModalAsignarCita 
        actualizar={() => {
          llenarCitasDisponibles();
          llenarCitasPorUsuario();
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
        if(rol != 1) {
          llenarCitasDocente();
          llenarHorarios();
        } else {
          llenarCitasPorUsuario();
          llenarCitasDisponibles();
        }
        closeCancel();
      }}
    />
  )
  const { openModal: openAccept, closeModal: closeAccept } = useModal(
    "Aceptar cita",
    <ModalAceptarCita 
      horario={v}
      actualizar={() => {
        llenarCitasDocente();
        llenarHorarios();
        closeAccept();
      }}
    />
  )

  return (
    <EventCardContainer onClick={() => {
      event === "Libre" ? openEdit() :
      event === "Pendiente" || event === "Cita" ? openCancel() :
      event === "Pendientes" && openAccept()
    }}>
      <EventPoint bgcolor={color}></EventPoint>
      <EventText>
        <EventH4>{event} - {v.hora_inicio} a {v.hora_final}</EventH4>
        <EventDesc>{event != "Pendientes" ? v.nombre : "Acepta una cita"}</EventDesc>
      </EventText>
    </EventCardContainer>
  )
}

export default EventCard;