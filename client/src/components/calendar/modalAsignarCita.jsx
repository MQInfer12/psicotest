import React from "react";
import { scheduleAppoinment } from "../../services/cita";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import { useUserContext } from "../../context/userContext";

const ModalAsignarCita = ({ actualizar, horario }) => {
  const { user } = useUserContext();

  const handleAppointment = async () => {
    const res = await scheduleAppoinment(horario.id, user.id);
    if(res.mensaje == "se asigno las cita correctamente") {
      actualizar();
    }
  }

  return (
    <FormContainer>
      <div>{horario.nombre}</div>
      <div>{horario.hora_inicio}</div>
      <div>{horario.hora_final}</div>
      <PurpleButton onClick={handleAppointment}>Asignar</PurpleButton>
    </FormContainer>
  )
}

export default ModalAsignarCita;