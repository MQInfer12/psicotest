import React from "react";
import styled from "styled-components";
import { PurpleButton } from "../../styles/globals/formularios";
import { useWindowHeight } from "../../hooks/useWindowHeight";
import DayCard from "./calendarBig/dayCard";

const CalendarBig = ({
  horarios, citas, user,
  mesActual, yearActual,
  llenarHorarios, llenarCitasDisponibles, llenarCitasDocente, llenarCitasPorUsuario,
  meses, getMes,
  comprobarDiaActual, comprobarMesActual,
  nextMonth, lastMonth
}) => {
  const windowHeight = useWindowHeight(true, true);

  return (
    <DivCalendarBig height={windowHeight}>
      <DivControls>
        <PurpleButton width="180px" onClick={lastMonth}>
          <i className="fa-solid fa-arrow-left"></i> {meses.at((mesActual - 1) % 12)}
        </PurpleButton>
          <CalendarMonth>
            {meses.at(mesActual % 12)}, {yearActual}
          </CalendarMonth>
        <PurpleButton width="180px" onClick={nextMonth}>
          {meses.at((mesActual + 1) % 12)}<i className="fa-solid fa-arrow-right"></i>
        </PurpleButton>
      </DivControls>
      <TableCalendar>
        <thead>
          <tr>
            <DaysTh>Dom</DaysTh>
            <DaysTh>Lun</DaysTh>
            <DaysTh>Mar</DaysTh>
            <DaysTh>Mie</DaysTh>
            <DaysTh>Jue</DaysTh>
            <DaysTh>Vie</DaysTh>
            <DaysTh>Sab</DaysTh>
          </tr>
        </thead>
        <tbody>
          {getMes(mesActual).map((row, i) => (
            <tr key={i}>
              {row.map((day, j) => (
                <DayCard key={j}
                  day={day}
                  comprobarDiaActual={comprobarDiaActual}
                  comprobarMesActual={comprobarMesActual}
                  user={user}
                  horarios={horarios}
                  citas={citas}
                  llenarHorarios={llenarHorarios}
                  llenarCitasDisponibles={llenarCitasDisponibles}
                  llenarCitasDocente={llenarCitasDocente}
                  llenarCitasPorUsuario={llenarCitasPorUsuario}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </TableCalendar>
    </DivCalendarBig>
  )
}

export default CalendarBig;

const DivCalendarBig = styled.div`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DivControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarMonth = styled.h2`
  color: #000000;
  font-size: 36px;
  font-weight: 600;
`;

const TableCalendar = styled.table`
  height: 100%;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  table-layout: fixed;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid #D9D9D9;
`;

const DaysTh = styled.th`
  height: 40px;
  font-size: 18px;
  color: #660BE1;
  border: 1px solid #D9D9D9;
`;