import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { UserContext } from "../../context/userContext";
import { getAllApoinments, getAppointByUser } from "../../services/cita";
import { addHorario, getTime, getTimeWithWhoHaveDate, updateHorario } from "../../services/horario";
import { PurpleButton } from "../../styles/globals/formularios";
import Modal from "../globals/modal";
import ModalHorario from "./modalHorario";
import ModalAsignarCita from "./modalAsignarCita";
import ModalCancelarCita from "./modalCancelarCita";
import ModalAceptarCita from "./modalAceptarCita";

const CalendarMini = () => {
  const { user } = useContext(UserContext);

  const [mesActual, setMesActual] = useState(dayjs().month());
  const [yearActual, setYearActual] = useState(dayjs().year());

  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showAccept, setShowAccept] = useState(false);

  const [fechaSelected, setFechaSelected] = useState(() => {
    const mes = dayjs().month() + 1 < 10 ? "0" + (dayjs().month() + 1) : dayjs().month() + 1;
    const dia = dayjs().date() < 10 ? "0" + dayjs().date() : dayjs().date();
    const year = dayjs().year();
    return {
      MDY: (mes + "/" + dia + "/" + year),
      DMY: (dia + "/" + mes + "/" + year)
    };
  });

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

  const comprobarDiaActual = (day) => { //COMPROBAR EL DÍA DE HOY
    if (day.format("MM/DD/YYYY") == fechaSelected.MDY) {
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

  const convertToDate = (time) => { //MOSTRAR LA HORA SIN LOS SEGUNDOS
    const hour = time.slice(0, time.search(":"));
    const minutes = time.slice(time.search(":") + 1, time.length).slice(0, time.search(":"));
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
    setHorarios(res);
  }

  const llenarCitasDocente = async () => {
    const res = await getTimeWithWhoHaveDate(user.id);
    setCitas(res);
  }

  const llenarCitasDisponibles = async () => { //API PARA OBTENER LOS HORARIOS PARA QUE ELIJA EL USUARIO
    const res = await getAllApoinments(user.email);
    setHorarios(res);
  }

  const llenarCitasPorUsuario = async () => {
    const resJson = await getAppointByUser(user.id);
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
      {
        showForm &&
        <Modal titulo="Añadir horario" cerrar={() => setShowForm(false)} >
          <ModalHorario 
            funcion="añadir"
            call={addHorario}
            id_docente={user.id}
            fecha={fechaSelected.MDY}
            actualizar={() => {
              llenarHorarios();
              setShowForm(false);
            }}
          />
        </Modal>
      }
      {
        showEdit &&
        <Modal titulo={user.id_rol != 1 ? "Editar horario" : "Asignar cita" } cerrar={() => setShowEdit(false)} >
          { user.id_rol != 1 ? (
              <ModalHorario 
                funcion="editar"
                call={updateHorario}
                horario={horarioSelected}
                actualizar={() => {
                  llenarHorarios();
                  setShowEdit(false);
                }}
              />
            ) : (
              <ModalAsignarCita 
                actualizar={() => {
                  llenarCitasDisponibles();
                  llenarCitasPorUsuario();
                  setShowEdit(false);
                }}
                horario={horarioSelected}
              />
            )
          }
        </Modal>
      }
      {
        showCancel &&
        <Modal titulo="Cancelar cita" cerrar={() => setShowCancel(false)} >
          <ModalCancelarCita 
            cita={horarioSelected}
            actualizar={() => {
              if(user.id_rol != 1) {
                llenarCitasDocente();
                llenarHorarios();
              } else {
                llenarCitasPorUsuario();
                llenarCitasDisponibles();
              }
              setShowCancel(false);
            }}
          />
        </Modal>
      }
      {
        showAccept &&
        <Modal titulo="Aceptar cita" cerrar={() => setShowAccept(false)} >
          <ModalAceptarCita 
            horario={horarioSelected}
            actualizar={() => {
              llenarCitasDocente();
              llenarHorarios();
              setShowAccept(false);
            }}
          />
        </Modal>
      }
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
        <PurpleButton onClick={() => setShowForm(true)}>Añadir horario</PurpleButton>
      }
      <EventsDiv>
        <EventsTitle>Eventos</EventsTitle>
          {
            horarios.filter(horario => horario.fecha === fechaSelected.DMY).map((v, i) => (
              <EventCard onClick={() => {
                  setHorarioSelected({
                    id: v.id,
                    nombre: v.nombre,
                    email: v.email,
                    disponible: v.disponible,
                    fecha: fechaSelected.MDY,
                    hora_final: v.hora_final,
                    hora_inicio: v.hora_inicio
                  });
                  setShowEdit(true);
                }}
                key={i}
              >
                <EventPoint bgcolor="#660be1"></EventPoint>
                <EventText>
                  <EventH4>Libre {v.hora_inicio} a {v.hora_final}</EventH4>
                  <EventDesc>{v.nombre}</EventDesc>
                </EventText>
              </EventCard>
            ))
          }
          {
            citas.filter(cita => cita.fecha === fechaSelected.DMY).map((v, i) => {
              if(v.aceptado) {
                return (
                  <EventCard onClick={() => {
                    setHorarioSelected({
                      id: v.id,
                      id_horario: v.id_horario,
                      nombre: v.nombre,
                      email: v.email,
                      fecha: fechaSelected.MDY,
                      hora_final: v.hora_final,
                      hora_inicio: v.hora_inicio,
                      aceptado: v.aceptado
                    });
                    setShowCancel(true);
                  }}
                  key={i}
                  >
                    <EventPoint bgcolor="#14804A"></EventPoint>
                    <EventText>
                      <EventH4>Cita - {v.hora_inicio} a {v.hora_final}</EventH4>
                      <EventDesc>{v.nombre}</EventDesc>
                    </EventText>
                  </EventCard>
                )
              } else {
                if(user.id_rol != 1) {
                  return (
                    <EventCard onClick={() => {
                      setHorarioSelected({
                        id_horario: v.id_horario
                      });
                      setShowAccept(true);
                    }} 
                    key={i}
                    >
                      <EventPoint bgcolor="#817633"></EventPoint>
                      <EventText>
                        <EventH4>Pendientes - {v.hora_inicio} a {v.hora_final}</EventH4>
                        <EventDesc>{v.nombre}</EventDesc>
                      </EventText>
                    </EventCard>
                  )
                } else {
                  return (
                    <EventCard onClick={() => {
                      setHorarioSelected({
                        id: v.id,
                        id_horario: v.id_horario,
                        nombre: v.nombre,
                        email: v.email,
                        fecha: fechaSelected.MDY,
                        hora_final: v.hora_final,
                        hora_inicio: v.hora_inicio,
                        aceptado: v.aceptado
                      });
                      setShowCancel(true);
                    }} 
                    key={i}
                    >
                      <EventPoint bgcolor="#817633"></EventPoint>
                      <EventText>
                        <EventH4>Pendiente - {v.hora_inicio} a {v.hora_final}</EventH4>
                        <EventDesc>{v.nombre}</EventDesc>
                      </EventText>
                    </EventCard>
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

const EventCard = styled.div`
  height: 70px;
  border-radius: 14px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 8px 30px;
  gap: 30px;
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const EventPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.bgcolor};
`;

const EventText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

const EventH4 = styled.h4`
  font-weight: 500;
  font-size: 16px;
`;

const EventDesc = styled.p`
  font-weight: 400;
  font-size: 12px;
  opacity: 0.4;
`;