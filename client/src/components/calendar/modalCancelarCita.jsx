import React from "react";
import { cancelAppoinment } from "../../services/cita";
import { DangerButton, FormContainer } from "../../styles/formularios";

const ModalCancelarCita = ({ actualizar, cita }) => {
  const handleAppointment = async () => {
    const res = await cancelAppoinment(cita.id_horario, cita.id);
    if(res) {
      actualizar();
    }
  }

  return (
    <FormContainer>
      <div>{cita.nombre}</div>
      <div>{cita.hora_inicio}</div>
      <div>{cita.hora_final}</div>
      <DangerButton onClick={handleAppointment}>Cancelar</DangerButton>
    </FormContainer>
  )
}

export default ModalCancelarCita;