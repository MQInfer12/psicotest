import React from "react";
import { PurpleButton } from "../../styles/globals/formularios";
import { useWindowHeight } from "../../hooks/useWindowHeight";
import DayCard from "./calendarBig/dayCard";
import { CalendarMonth, DaysThBig, DivCalendarBig, DivControls, TableCalendar } from "../../styles/pages/calendar";

const CalendarBig = ({
  horarios, citas, user,
  mesActual, yearActual,
  llenarTareas, meses, getMes,
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
            <DaysThBig>Dom</DaysThBig>
            <DaysThBig>Lun</DaysThBig>
            <DaysThBig>Mar</DaysThBig>
            <DaysThBig>Mie</DaysThBig>
            <DaysThBig>Jue</DaysThBig>
            <DaysThBig>Vie</DaysThBig>
            <DaysThBig>Sab</DaysThBig>
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
                  llenarTareas={llenarTareas}
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