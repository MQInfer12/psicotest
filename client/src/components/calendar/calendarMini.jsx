import React from "react";
import styled from "styled-components";
import { addHorario } from "../../services/horario";
import { PurpleButton } from "../../styles/globals/formularios";
import ModalHorario from "./modalHorario";
import { useModal } from "../../hooks/useModal";
import EventCard from "./calendarMini/eventCard";

const CalendarMini = ({
  horarios, citas, user,
  mesActual, yearActual,
  fechaSelected, setFechaSelected,
  llenarHorarios, llenarCitasDisponibles, llenarCitasDocente, llenarCitasPorUsuario,
  meses, getMes,
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
      fecha={fechaSelected.MDY}
      actualizar={() => {
        llenarHorarios();
        closeModal();
      }}
    />
  )

  return (
    <CalendarContainer>
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
            <DaysTh>Do</DaysTh>
            <DaysTh>Lu</DaysTh>
            <DaysTh>Ma</DaysTh>
            <DaysTh>Mi</DaysTh>
            <DaysTh>Ju</DaysTh>
            <DaysTh>Vi</DaysTh>
            <DaysTh>Sa</DaysTh>
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
                v={{...v, fecha: fechaSelected.MDY}}
                color={"#660be1"}
                event={"Libre"}
                rol={user.id_rol}
                llenarHorarios={llenarHorarios} 
                llenarCitasDisponibles={llenarCitasDisponibles}
                llenarCitasDocente={llenarCitasDocente} 
                llenarCitasPorUsuario={llenarCitasPorUsuario}
              />
            ))
          }
          {
            citas.filter(cita => cita.fecha === fechaSelected.DMY).map((v, i) => {
              if(v.aceptado) {
                return (
                  <EventCard key={i}
                    v={{...v, fecha: fechaSelected.MDY}}
                    color={"#14804A"}
                    event={"Cita"}
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
                    <EventCard key={i}
                      v={{...v, fecha: fechaSelected.MDY}}
                      color={"#817633"}
                      event={"Pendientes"}
                      rol={user.id_rol}
                      llenarHorarios={llenarHorarios} 
                      llenarCitasDisponibles={llenarCitasDisponibles}
                      llenarCitasDocente={llenarCitasDocente} 
                      llenarCitasPorUsuario={llenarCitasPorUsuario}
                    />
                  )
                } else {
                  return (
                    <EventCard key={i}
                      v={{...v, fecha: fechaSelected.MDY}}
                      color={"#817633"}
                      event={"Pendiente"}
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
      </EventsDiv>
    </CalendarContainer>
  )
}

export default CalendarMini;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 353px;
`;

const CalendarMonth = styled.h2`
  color: #000000;
  font-size: 36px;
  font-weight: 600;
`;

const CalendarTable = styled.table`
  text-align: center;
  width: 353px;
  transform: scale(1);
`;

const DaysTh = styled.th`
  color: #660be1;
  height: 45px;
  min-width: 45px;
`;

const DaysTd = styled.td`
  border-radius: 50%;
  position: relative;
  font-size: 13px;
  height: 50px;
  min-width: 50px;
  z-index: 1;
  color: ${(props) => props.month && "rgba(0, 0, 0, 0.3)"};
  color: ${(props) => props.today && "#FFFFFF"};
  cursor: pointer;

  &::before {
    content: "";
    opacity: ${props => props.today ? "1" : "0"};
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #660be1;
    border-radius: 50%;
    transform: scale(0.8);
  }

  &::after {
    content: "";
    opacity: ${props => props.hayEventos ? "1" : "0"};
    background-color: ${(props) => props.today ? "#FFFFFF" : "#660be1"};
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 9px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const MonthButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1.5px solid #d9d9d9;
  background-color: transparent;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #d9d9d9;
    background-color: #660be1;
  }
`;

const EventsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  gap: 16px;
  max-width: 500px;
`;

const EventsTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
`;