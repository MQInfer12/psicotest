import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { UserContext } from "../../context/userContext";
import { getAllApoinments, getAppointByUser } from "../../services/cita";
import { getTime, getTimeWithWhoHaveDate } from "../../services/horario";
import { PurpleButton } from "../../styles/formularios";

const CalendarMini = () => {
  const { user } = useContext(UserContext);

  const [mesActual, setMesActual] = useState(dayjs().month());
  const [yearActual, setYearActual] = useState(dayjs().year());

  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showAccept, setShowAccept] = useState(false);

  const [fechaSelected, setFechaSelected] = useState("");
  const [horarioSelected, setHorarioSelected] = useState({});

  const [horarios, setHorarios] = useState([]);
  const [citas, setCitas] = useState([]);

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
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

  const comprobarDiaActual = (year, mes, dia) => { //COMPROBAR EL DÍA DE HOY
    if (
      year == dayjs().year() &&
      mes == dayjs().month() + 1 &&
      dia == dayjs().date()
    ) {
      return true;
    }
    return false;
  };

  const comprobarMesActual = (mes) => { //COMPROBAR EL MES EN EL QUE ESTAMOS
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

  const convertToDate = (day, time) => { //MOSTRAR LA HORA SIN LOS SEGUNDOS
    const hour = time.slice(0, time.search(":"));
    const minutes = time.slice(time.search(":") + 1, time.length).slice(0, time.search(":"));
    const hora = new Date(
      day.format("YYYY"),
      day.format("MM") - 1,
      day.format("DD"),
      hour,
      minutes
    )
    
    const mostrarCeros = (minutos) => {
      if(minutos == 0) {
        return "00";
      } else {
        return minutos;
      }
    }
    const mostrar = hora.getHours() + ":" + mostrarCeros(hora.getMinutes());

    return mostrar;
  }

  const llenarHorarios = async () => { //API PARA OBTENER LOS HORARIOS DE ADMINISTRADORES Y DOCENTES
    const res = await getTime(user.id);
    console.log("horarios", res);
    setHorarios(res);
  }

  const llenarCitasDocente = async () => {
    const res = await getTimeWithWhoHaveDate(user.id);
    console.log("citas", res);
    setCitas(res);
  }

  const llenarCitasDisponibles = async () => { //API PARA OBTENER LOS HORARIOS PARA QUE ELIJA EL USUARIO
    const res = await getAllApoinments(user.email);
    console.log("horarios", res);
    setHorarios(res);
  }

  const llenarCitasPorUsuario = async () => {
    const resJson = await getAppointByUser(user.id);
    console.log("citas", res);
    setCitas(resJson);
  }

  useEffect(() => {
    if(user.id_rol != 1) {
      llenarHorarios();
      llenarCitasDocente();
    } else {
      llenarCitasDisponibles();
      llenarCitasPorUsuario();
    }
  }, []);

  return (
    <CalendarContainer>
      <MonthContainer>
        <MonthButton onClick={lastMonth}>
          <i className="fa-solid fa-arrow-left"></i>
        </MonthButton>
        <CalendarMonth>
          {meses.at(mesActual % 12)}, {yearActual}
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
                  today={comprobarDiaActual(
                    day.format("YYYY"),
                    day.format("MM"),
                    day.format("DD")
                  )}
                  month={comprobarMesActual(day.format("MM"))}
                  key={j}
                >
                  {day.format("DD")}
                  {comprobarDiaActual(
                    day.format("YYYY"),
                    day.format("MM"),
                    day.format("DD")
                  ) && <SpanTd></SpanTd>}
                </DaysTd>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarTable>
      {
        user.id_rol === 2 && 
        <PurpleButton>Añadir</PurpleButton>
      }
    </CalendarContainer>
  )
}

export default CalendarMini;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: 1135px) {
    margin: 30px 0;
  }
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
`;

const SpanTd = styled.span`
  z-index: -1;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #660be1;
  border-radius: 50%;
  transform: scale(0.8);
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