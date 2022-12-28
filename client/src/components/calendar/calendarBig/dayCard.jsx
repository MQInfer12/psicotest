import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { addHorario } from '../../../services/horario';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import { DivDay, DivTd, PDay, TdDay } from '../../../styles/pages/calendar';
import ModalHorario from '../modalHorario';
import TaskCard from './taskCard';

const DayCard = ({ 
  day, comprobarDiaActual, comprobarMesActual, user, horarios, citas, llenarTareas
}) => {
  const { openModal, closeModal } = useModal(
    "Añadir horario",
    <ModalHorario 
      funcion="añadir"
      call={ addHorario }
      id_docente={user.id}
      fecha={day.format("DD/MM/YYYY")}
      actualizar={() => {
        llenarTareas();
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
              v={{...v, fecha: day.format("DD/MM/YYYY")}}
              background="#F0F1FA"
              textcolor="#4F5AED"
              event="Libre"
              rol={user.id_rol}
              llenarTareas={llenarTareas}
            />
          ))
        }
        {
          citas.filter(v => v.fecha == day.format("DD/MM/YYYY")).map((v, i) => {
            if(v.aceptado) {
              return (
                <TaskCard key={i}
                  v={{...v, fecha: day.format("DD/MM/YYYY")}}
                  background="#E1FCEF"
                  textcolor="#14804A"
                  event="Cita"
                  rol={user.id_rol}
                  llenarTareas={llenarTareas}
                />
              )
            } else {
              if(user.id_rol != 1) {
                return (
                  <TaskCard key={i}
                    v={{...v, fecha: day.format("DD/MM/YYYY")}}
                    background="#faea8e"
                    textcolor="#817633"
                    event="Pendientes"
                    rol={user.id_rol}
                    llenarTareas={llenarTareas}
                  />
                )
              } else {
                return (
                  <TaskCard key={i}
                    v={{...v, fecha: day.format("DD/MM/YYYY")}}
                    background="#faea8e"
                    textcolor="#817633"
                    event="Pendiente"
                    rol={user.id_rol}
                    llenarTareas={llenarTareas}
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