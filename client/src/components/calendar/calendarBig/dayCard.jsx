import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../../hooks/useModal';
import { addHorario } from '../../../services/horario';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import ModalHorario from '../modalHorario';
import TaskCard from './taskCard';

const DayCard = ({ 
  day, comprobarDiaActual, comprobarMesActual, user, horarios, citas,
  llenarHorarios, llenarCitasDisponibles, llenarCitasDocente, llenarCitasPorUsuario
}) => {
  const { openModal, closeModal } = useModal(
    "Añadir horario",
    <ModalHorario 
      funcion="añadir"
      call={ addHorario }
      id_docente={user.id}
      fecha={day.format("MM/DD/YYYY")}
      actualizar={() => {
        llenarHorarios();
        closeModal();
      }}
    />
  )

  return (
    <TdDay
      today={comprobarDiaActual(day)}
      month={comprobarMesActual(day.format("MM"))}
    >
      <DivTd>
        <DivDay
          today={comprobarDiaActual(day)}
        >
          <PDay>{day.format("DD")}</PDay>
          {
            user.id_rol != 1 && 
            <WhiteIconButton 
              title="Añadir horario"
              onClick={openModal}
            >
              <i className="fa-solid fa-plus"></i>
            </WhiteIconButton>
          }
        </DivDay>
        {
          horarios.filter(v => v.fecha == day.format("DD/MM/YYYY")).map((v, i) => (
            <TaskCard key={i}
              v={{...v, fecha: day.format("MM/DD/YYYY")}}
              background="#F0F1FA"
              textcolor="#4F5AED"
              event="Libre"
              rol={user.id_rol}
              llenarHorarios={llenarHorarios}
              llenarCitasDisponibles={llenarCitasDisponibles}
              llenarCitasDocente={llenarCitasDocente}
              llenarCitasPorUsuario={llenarCitasPorUsuario}
            />
          ))
        }
        {
          citas.filter(v => v.fecha == day.format("DD/MM/YYYY")).map((v, i) => {
            if(v.aceptado) {
              return (
                <TaskCard key={i}
                  v={{...v, fecha: day.format("MM/DD/YYYY")}}
                  background="#E1FCEF"
                  textcolor="#14804A"
                  event="Cita"
                  rol={user.id_rol}
                  llenarHorarios={llenarHorarios}
                  llenarCitasDisponibles={llenarCitasDisponibles}
                  llenarCitasDocente={llenarCitasDocente}
                  llenarCitasPorUsuario={llenarCitasPorUsuario}
                />
              )
            } else {
              if(user.id_rol != 1) {
                return (
                  <TaskCard key={i}
                    v={{...v, fecha: day.format("MM/DD/YYYY")}}
                    background="#faea8e"
                    textcolor="#817633"
                    event="Pendientes"
                    rol={user.id_rol}
                    llenarHorarios={llenarHorarios}
                    llenarCitasDisponibles={llenarCitasDisponibles}
                    llenarCitasDocente={llenarCitasDocente}
                    llenarCitasPorUsuario={llenarCitasPorUsuario}
                  />
                )
              } else {
                return (
                  <TaskCard key={i}
                    v={{...v, fecha: day.format("MM/DD/YYYY")}}
                    background="#faea8e"
                    textcolor="#817633"
                    event="Pendiente"
                    rol={user.id_rol}
                    llenarHorarios={llenarHorarios}
                    llenarCitasDisponibles={llenarCitasDisponibles}
                    llenarCitasDocente={llenarCitasDocente}
                    llenarCitasPorUsuario={llenarCitasPorUsuario}
                  />
                )
              }
            }
          })
        }
      </DivTd>
    </TdDay>
  )
}

export default DayCard;

const TdDay = styled.td`
  opacity: ${props => props.month? 0.5 : 1};
  border: 1px solid #D9D9D9;
`;

const DivTd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: auto;
  overflow-x: hidden;

  position: relative;
  width: 100%;
  height: 100%;
  font-size: 14px;

  &:hover > div > button {
    display: block;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #D9D9D9;
  }

  &::-webkit-scrollbar-thumb {
    background: #660BE1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #660BE1;
  }
`;

const DivDay = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  min-height: 32px;

  & > button {
    display: none;
    transform: scale(0.8);
  }
`;

const PDay = styled.p`
  color: ${props => props.today && '#660BE1'};
  padding: 1px 10px;
`;