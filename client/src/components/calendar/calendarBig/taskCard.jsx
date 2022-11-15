import React from 'react'
import styled from 'styled-components';
import { useModal } from '../../../hooks/useModal';
import { updateHorario } from '../../../services/horario';
import ModalAceptarCita from '../modalAceptarCita';
import ModalAsignarCita from '../modalAsignarCita';
import ModalCancelarCita from '../modalCancelarCita';
import ModalHorario from '../modalHorario';

const TaskCard = ({
  v, background, textcolor, event, rol,
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
    <DivTask 
      background={background}
      textcolor={textcolor}
      onClick={() => {
        event === "Libre" ? openEdit() :
        event === "Pendiente" || event === "Cita" ? openCancel() :
        event === "Pendientes" && openAccept()
      }} 
    >
      {event + " - "}
      {v.hora_inicio.substring(0, 5)} a {v.hora_final.substring(0, 5)}
    </DivTask>
  )
}

export default TaskCard

const DivTask = styled.div`
  width: 100%;
  background-color: ${props => props.background};
  color: ${props => props.textcolor};
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;