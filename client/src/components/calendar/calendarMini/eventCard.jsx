import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../../hooks/useModal';
import { updateHorario } from '../../../services/horario';
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

const EventCardContainer = styled.div`
  height: 70px;
  border-radius: 14px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 8px 30px;
  gap: 30px;
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const EventPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.bgcolor};
`;

const EventText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

const EventH4 = styled.h4`
  font-weight: 500;
  font-size: 16px;
`;

const EventDesc = styled.p`
  font-weight: 400;
  font-size: 12px;
  opacity: 0.4;
`;