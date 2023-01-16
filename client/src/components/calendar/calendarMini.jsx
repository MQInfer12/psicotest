import React from "react";
import { addHorario } from "../../services/horario";
import { PurpleButton } from "../../styles/globals/formularios";
import ModalHorario from "./modalHorario";
import { useModal } from "../../hooks/useModal";
import EventCard from "./calendarMini/eventCard";
import { CalendarMiniContainer, CalendarMonth, CalendarTable, 
  DaysTd, DaysThMini, EventsDiv, 
  EventsTitle, MonthButton, MonthContainer 
} from "../../styles/pages/calendar";

const CalendarMini = ({
  horarios, citas, user,
  mesActual, yearActual,
  fechaSelected, setFechaSelected,
  llenarTareas, meses, getMes,
  comprobarDiaActual, comprobarMesActual,
  nextMonth, lastMonth
}) => {
  const comprobarHorariosEseDia = (day) => {
    let flag = false;
    horarios.forEach(horario => {
      if(horario.fecha === day.format("DD/MM/YYYY")) {
        flag = true;
      }
    })
    if(flag) {
      return true;
    }
    return false;
  }

  const comprobarCitasEseDia = (day) => {
    let flag = false;
    citas.forEach(horario => {
      if(horario.fecha === day.format("DD/MM/YYYY")) {
        flag = true;
      }
    })
    if(flag) {
      return true;
    }
    return false;
  }

  const { openModal, closeModal } = useModal(
    "Añadir horario",
    <ModalHorario 
      funcion="añadir"
      call={addHorario}
      id_docente={user.id}
      fecha={fechaSelected.DMY}
      actualizar={() => {
        llenarTareas();
        closeModal();
      }}
    />
  )

  return (
    <CalendarMiniContainer>
      <MonthContainer>
        <MonthButton onClick={lastMonth}>
          <i className="fa-solid fa-arrow-left"></i>
        </MonthButton>
        <CalendarMonth>
          {meses.at(mesActual % 12).substring(0, 3)}, {yearActual}
        </CalendarMonth>
        <MonthButton onClick={nextMonth}>
          <i className="fa-solid fa-arrow-right"></i>
        </MonthButton>
      </MonthContainer>
      <CalendarTable>
        <thead>
          <tr>
            <DaysThMini>Do</DaysThMini>
            <DaysThMini>Lu</DaysThMini>
            <DaysThMini>Ma</DaysThMini>
            <DaysThMini>Mi</DaysThMini>
            <DaysThMini>Ju</DaysThMini>
            <DaysThMini>Vi</DaysThMini>
            <DaysThMini>Sa</DaysThMini>
          </tr>
        </thead>
        <tbody>
          {getMes(mesActual).map((row, i) => (
            <tr key={i}>
              {row.map((day, j) => (
                <DaysTd
                  hayEventos={comprobarHorariosEseDia(day) || comprobarCitasEseDia(day)}
                  today={comprobarDiaActual(day)}
                  month={comprobarMesActual(day.format("MM"))}
                  key={j}
                  onClick={() => {setFechaSelected({MDY: day.format("MM/DD/YYYY"), DMY: day.format("DD/MM/YYYY")})}}
                >
                  {day.format("DD")}
                </DaysTd>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
      {
        user.id_rol === 2 && 
        <PurpleButton onClick={openModal}>Añadir horario</PurpleButton>
      }
      <EventsDiv>
        <EventsTitle>Eventos</EventsTitle>
          {
            horarios.filter(horario => horario.fecha === fechaSelected.DMY).map((v, i) => (
              <EventCard key={i}
                v={{...v, fecha: fechaSelected.DMY}}
                color={"#660be1"}
                event={"Libre"}
                rol={user.id_rol}
                llenarTareas={llenarTareas} 
              />
            ))
          }
          {
            citas.filter(cita => cita.fecha === fechaSelected.DMY).map((v, i) => {
              if(v.aceptado) {
                return (
                  <EventCard key={i}
                    v={{...v, fecha: fechaSelected.DMY}}
                    color={"#179E5B"}
                    event={"Cita"}
                    rol={user.id_rol}
                    llenarTareas={llenarTareas} 
                  />
                )
              } else {
                if(user.id_rol != 1) {
                  return (
                    <EventCard key={i}
                      v={{...v, fecha: fechaSelected.DMY}}
                      color={"#B3A449"}
                      event={"Pendientes"}
                      rol={user.id_rol}
                      llenarTareas={llenarTareas}
                    />
                  )
                } else {
                  return (
                    <EventCard key={i}
                      v={{...v, fecha: fechaSelected.DMY}}
                      color={"#B3A449"}
                      event={"Pendiente"}
                      rol={user.id_rol}
                      llenarTareas={llenarTareas}
                    />
                  )
                }
              }
            })
          }
      </EventsDiv>
    </CalendarMiniContainer>
  )
}

export default CalendarMini;