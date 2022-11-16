import React from 'react';
import styled from 'styled-components';
import useGet from '../../hooks/useGet';
import { acceptAppointment, getAppointByHorario } from '../../services/cita';
import { WhiteButton } from '../../styles/globals/formularios';
import Cargando from '../globals/cargando';

const ModalAceptarCita = ({horario, actualizar}) => {
  const { resJson: citas, loading } = useGet(getAppointByHorario, { idHorario: horario.id_horario });

  const AceptarCita = async (id) => {
    const res = await acceptAppointment(horario.id_horario, id);
    if(res.ok) {
      actualizar();
    }
  }

  return (
    <DivContainer>
      {
        loading ? (
          <Cargando />
        ) : (
          citas.map((v, i) => (
            <DivUser key={i}>
              {v.nombre}
              <WhiteButton onClick={() => AceptarCita(v.id)}>Aceptar</WhiteButton>
            </DivUser>
          ))
        )
      }
    </DivContainer>
  )
}

export default ModalAceptarCita;

const DivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 200px;
  max-height: 200px;
  overflow: auto;
`;

const DivUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;