import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CalendarBig from "../components/calendar/calendarBig";
import CalendarMini from "../components/calendar/calendarMini";
import dayjs from "dayjs";
import { useUserContext } from "../context/userContext";
import useGet from "../hooks/useGet";

const Calendar = () => {
  const [screen, setScreen] = useState(window.innerWidth);
  const { user } = useUserContext();

  const [mesActual, setMesActual] = useState(dayjs().month());
  const [yearActual, setYearActual] = useState(dayjs().year());

  const [fechaSelected, setFechaSelected] = useState(() => {
    const mes = dayjs().month() + 1 < 10 ? "0" + (dayjs().month() + 1) : dayjs().month() + 1;
    const dia = dayjs().date() < 10 ? "0" + dayjs().date() : dayjs().date();
    const year = dayjs().year();
    return {
      MDY: (mes + "/" + dia + "/" + year),
      DMY: (dia + "/" + mes + "/" + year)
    };
  });

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

  const getMes = (mes) => { //OBTENER EL ARRAY DE DÍAS DEL MES ACTUAL
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

  const comprobarDiaActual = (day) => { //COMPROBAR EL DÍA DE HOY
    if (day.format("MM/DD/YYYY") == fechaSelected.MDY) {
      return true;
    }
    return false;
  };

  const comprobarMesActual = (mes) => { //COMPROBAR EL MES EN EL QUE ESTAMOShorarios
    if (mesActual % 12 < 0) {
      if (mes - 1 == (mesActual % 12) + 12) {
        return false;
      }
    } else if (mes - 1 == mesActual % 12) {
      return false;
    }
    return true;
  };

  const nextMonth = () => { //IR CAMBIANDO LA VARIABLE DE MES Y AÑO HACIA ADELANTE
    setMesActual(mesActual + 1);
    if ((mesActual + 1) % 12 == 0) {
      setYearActual(yearActual + 1);
    }
  };

  const lastMonth = () => { //IR CAMBIANDO LA VARIABLE DE MES Y AÑO HACIA ATRAS
    setMesActual(mesActual - 1);
    if (mesActual % 12 == 0) {
      setYearActual(yearActual - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth);
    });
  }, []);

  const { callAPI: llenarTareas, resJson: tareas } = useGet(`cita/all/${user.id}`, { initialValue: { horarios: [], citas: [] }});

  return (
    screen <= 1050 ? (
      <CalendarMini 
        horarios={tareas.horarios}
        citas={tareas.citas}
        user={user}
        mesActual={mesActual}
        yearActual={yearActual}
        fechaSelected={fechaSelected}
        setFechaSelected={setFechaSelected}
        llenarTareas={llenarTareas}
        meses={meses}
        getMes={getMes}
        comprobarDiaActual={comprobarDiaActual}
        comprobarMesActual={comprobarMesActual}
        nextMonth={nextMonth}
        lastMonth={lastMonth}
      />
    ) : (
      <CalendarBig 
        horarios={tareas.horarios}
        citas={tareas.citas}
        user={user}
        mesActual={mesActual}
        yearActual={yearActual}
        llenarTareas={llenarTareas}
        meses={meses}
        getMes={getMes}
        comprobarDiaActual={comprobarDiaActual}
        comprobarMesActual={comprobarMesActual}
        nextMonth={nextMonth}
        lastMonth={lastMonth}
      />
    )
  )
};

export default Calendar;
