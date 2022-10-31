import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { acceptAppointment, getAppointByHorario } from '../../services/cita';
import { WhiteButton } from '../../styles/formularios';
import Cargando from '../globals/cargando';

const ModalAceptarCita = ({horario, actualizar}) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const llenarCitas = async () => {
    const res = await getAppointByHorario(horario.id_horario);
    setCitas(res);
    setLoading(false);
  }

  const AceptarCita = async (id) => {
    const res = await acceptAppointment(horario.id_horario, id);
    console.log(res.ok);
    if(res.ok) {
      actualizar();
    }
  }

  useEffect(() => {
    llenarCitas();
  }, []);

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