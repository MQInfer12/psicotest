import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { PurpleButton } from "../../styles/formularios";

const DivCalendarBig = styled.div`
  height: 100%;
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

const TdDay = styled.td`
  opacity: ${props => props.month? 0.5 : 1};
  border: 1px solid #D9D9D9;
`;

const DivTd = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
`;

const PDay = styled.p`
  color: ${props => props.today && '#660BE1'};
`;

const CalendarBig = () => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [mesActual, setMesActual] = useState(dayjs().month());
  const [yearActual, setYearActual] = useState(dayjs().year());

  const getMes = (mes) => {
    const year = dayjs().year();
    const primerDiaDelMes = dayjs(new Date(year, mes, 1)).day();
    let diaActual = 0 - primerDiaDelMes;
    const dias = new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        diaActual++;
        return dayjs(new Date(year, mes, diaActual));
      });
    });
    let cont = 0;
    dias[5].forEach((day) => {
      if (day.format("DD") <= 14) {
        cont++;
      }
    });
    if (cont == 7) dias.pop();

    return dias;
  };

  const comprobarDiaActual = (year, mes, dia) => {
    if (
      year == dayjs().year() &&
      mes == dayjs().month() + 1 &&
      dia == dayjs().date()
    ) {
      return true;
    }
    return false;
  };

  const comprobarMesActual = (mes) => {
    if (mesActual % 12 < 0) {
      if (mes - 1 == (mesActual % 12) + 12) {
        return false;
      }
    } else if (mes - 1 == mesActual % 12) {
      return false;
    }
    return true;
  };

  const nextMonth = () => {
    setMesActual(mesActual + 1);
    if ((mesActual + 1) % 12 == 0) {
      setYearActual(yearActual + 1);
    }
  };

  const lastMonth = () => {
    setMesActual(mesActual - 1);
    if (mesActual % 12 == 0) {
      setYearActual(yearActual - 1);
    }
  };

  return(
    <DivCalendarBig>
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
                <TdDay
                  today={comprobarDiaActual(
                    day.format("YYYY"),
                    day.format("MM"),
                    day.format("DD")
                  )}
                  month={comprobarMesActual(day.format("MM"))}
                  key={j}
                >
                  <DivTd>
                    <PDay
                      today={comprobarDiaActual(
                        day.format("YYYY"),
                        day.format("MM"),
                        day.format("DD")
                      )}
                    >
                      {day.format("DD")}
                    </PDay>
                  </DivTd>
                </TdDay>
              ))}
            </tr>
          ))}
        </tbody>
      </TableCalendar>
    </DivCalendarBig>
  )
}

export default CalendarBig;